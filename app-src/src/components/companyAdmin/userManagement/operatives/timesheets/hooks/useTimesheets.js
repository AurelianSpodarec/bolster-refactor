import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import fetchTimesheetsWeek from 'actions/companyAdmin/timesheets/async/fetchTimesheetsWeek';
import { useParams } from 'react-router-dom';
import {
    selectFilterByHasClockedIn,
    selectTimesheetOptions,
    selectTimesheets,
    selectTimesheetsFetchError,
    selectTimesheetsIsFetching,
    timesheetSelectedCompanyIDs,
} from 'selectors/companyAdmin/timesheets';
import {
    selectUserPinFeeds,
    selectUserPinFeedsFetchError,
    selectUserPinFeedsIsFetching,
} from 'selectors/companyAdmin/userPinFeeds';
import { selectJobReferencesIsFetching } from 'selectors/companyAdmin/jobReferences';
import { isEmpty } from 'lodash';
import { selectServiceIDs } from 'selectors/companyAdmin/services';
import { ERROR_MODAL, GENERATE_TIMESHEET_REPORT } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { usePrevious, useQuery } from 'helpers/hooks';
import { areArraysEqual } from 'helpers/generic';
import { setCompanyUserIDs } from 'actions/companyAdmin/timesheets/sync/setSelectedCompanyUserID';
import fetchTimesheetsWeekDropdownOptions from 'actions/companyAdmin/timesheets/async/fetchTimesheetsWeekDropdownOptions';
import fetchJobReferences from 'actions/companyAdmin/jobReferences/async/fetchJobReferences';

const useTimesheets = () => {
    const dispatch = useDispatch();

    const { timeZone } = useSelector(selectCompanySettings);

    const { id } = useParams();

    const query = useQuery();

    const companyUsersIsFetching = useSelector(selectCompanyUsersIsFetching);
    const companyUsersFetchError = useSelector(selectCompanyUsersFetchError);

    const timesheetsIsFetching = useSelector(selectTimesheetsIsFetching);
    const timesheetsFetchError = useSelector(selectTimesheetsFetchError);
    const timesheets = useSelector(selectTimesheets);
    const timesheetOptions = useSelector(selectTimesheetOptions);

    const jobReferencesIsFetching = useSelector(selectJobReferencesIsFetching);

    const reportGenPins = useSelector(selectUserPinFeeds);
    const isFetchingReportGenPins = useSelector(selectUserPinFeedsIsFetching);
    const errorReportGenPins = useSelector(selectUserPinFeedsFetchError);
    const serviceIDs = useSelector(selectServiceIDs);
    const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);

    const companyUserIDs = useSelector(timesheetSelectedCompanyIDs);

    const initialDate = query.get('date') || new Date();
    const thisWeek = moment(initialDate)
        .tz(timeZone?.id ?? 'Europe/London')
        .startOf('isoWeek')
        .format();
    const thisDay = moment(initialDate)
        .tz(timeZone?.id ?? 'Europe/London')
        .startOf('day')
        .format();

    const [companyUserOptions, setCompanyUserOptions] = useState([]);
    const [startDate, setStartDate] = useState(thisWeek);
    const [selectedDate, setSelectedDate] = useState(thisDay);
    const [timePeriod, setTimePeriod] = useState(TIME_PERIOD.DAY);

    const onPrev = () => {
        const newStartDate = moment(startDate).subtract(7, 'days').format();
        setStartDate(newStartDate);
        setSelectedDate(newStartDate);
    };
    const onNext = () => {
        const newStartDate = moment(startDate).add(7, 'days').format();
        setStartDate(newStartDate);
        setSelectedDate(newStartDate);
    };
    const onToday = () => {
        setStartDate(thisWeek);
        setTimePeriod(TIME_PERIOD.DAY);
        setSelectedDate(thisDay);
    };

    const onDaySelect = timestamp => {
        setTimePeriod(TIME_PERIOD.DAY);
        setSelectedDate(timestamp);
    };
    const onWeekSelect = timestamp => {
        setTimePeriod(TIME_PERIOD.WEEK);
        setSelectedDate(timestamp);
    };

    const handlePDFReportGeneration = () => {
        if (isEmpty(reportGenPins)) {
            dispatch(
                showModal(ERROR_MODAL, {
                    message: 'No pin histories created during selected timeframe.',
                }),
            );
            return;
        }

        const hierarchyID = [
            ...new Set(
                reportGenPins.map(({ items }) => items.map(({ drawingID }) => drawingID)).flat(),
            ),
        ];
        const pinIDs = [
            ...new Set(reportGenPins.map(({ items }) => items.map(({ pinID }) => pinID)).flat()),
        ];

        if (isEmpty(hierarchyID.filter(Boolean)) || isEmpty(pinIDs.filter(Boolean))) {
            dispatch(
                showModal(ERROR_MODAL, {
                    message: 'No pin histories created during selected timeframe.',
                }),
            );
            return;
        }

        dispatch(
            showModal(GENERATE_TIMESHEET_REPORT, {
                fromDateInclusive: startDate,
                toDateInclusive: moment(selectedDate).endOf(timePeriod).format(),
                serviceID: serviceIDs,
                hierarchyID,
                pinIDs,
            }),
        );
    };

    const dayTotal = {
        formattedHours: 0,
        formattedBreakHours: 0,
        totalPins: 0,
        jobReferenceIDs: [],
    };
    const totals = timesheets.reduce(
        (acc, timesheet) => {
            timesheet.clockerEntries.forEach((entry, i) => {
                acc[i].formattedHours += entry.formattedHours;
                acc[i].formattedBreakHours += entry.formattedBreakHours;
                acc[i].totalPins += entry.totalPins;
                acc[i].jobReferenceIDs = [...acc[i].jobReferenceIDs, ...entry.jobReferenceIDs];
            });
            return acc;
        },

        new Array(7).fill(dayTotal).map((day, i) => ({
            ...day,
            date: moment(startDate).add(i, 'days').format(),
        })),
    );

    const prevProps = usePrevious({ companyUserIDs, startDate });

    useEffect(() => {
        // on first mount

        if (id) {
            const postBody = [parseInt(id)];
            batch(() => {
                dispatch(setCompanyUserIDs(postBody));
                dispatch(fetchTimesheetsWeek(postBody, startDate));
            });
        } else {
            batch(() => {
                dispatch(fetchTimesheetsWeekDropdownOptions(startDate));
                dispatch(fetchTimesheetsWeek([], startDate));
                dispatch(fetchCompanyUsers());
                dispatch(fetchJobReferences());
            });
        }
    }, [dispatch]);

    useEffect(() => {
        if (
            !areArraysEqual(companyUserIDs, prevProps.companyUserIDs) ||
            startDate !== prevProps.startDate
        ) {
            dispatch(fetchTimesheetsWeek(companyUserIDs, startDate));
            dispatch(fetchTimesheetsWeekDropdownOptions(startDate));
        }
    }, [dispatch, companyUserIDs, startDate]);

    useEffect(() => {
        let companyUserOptions = timesheetOptions.map(mapCompanyUsers);

        if (filterByHasClockedIn) {
            companyUserOptions = timesheetOptions
                .filter(({ id, hasTimesheetData }) => {
                    if (companyUserIDs.length) {
                        return companyUserIDs.includes(id) || hasTimesheetData;
                    }
                    return hasTimesheetData;
                })
                .map(mapCompanyUsers);
        }

        setCompanyUserOptions(companyUserOptions);
    }, [timesheetOptions, filterByHasClockedIn, companyUserIDs]);

    return {
        startDate,
        selectedDate,
        timePeriod,
        companyUserIDs,
        setCompanyUserIDs,
        companyUserOptions,
        isFetching: timesheetsIsFetching || companyUsersIsFetching || jobReferencesIsFetching,
        fetchError: timesheetsFetchError || companyUsersFetchError,
        timesheets,
        totals,
        disableReportGenPin:
            isFetchingReportGenPins || (!isFetchingReportGenPins && errorReportGenPins),
        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
        handlePDFReportGeneration,
    };
};

const mapCompanyUsers = options => {
    return {
        value: options.id,
        label: `${options.firstName} ${options.lastName} (${options.email})`,
    };
};

export default useTimesheets;
