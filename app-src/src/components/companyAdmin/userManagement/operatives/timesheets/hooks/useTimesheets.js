import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import fetchTimesheetsWeek from 'actions/companyAdmin/timesheets/async/fetchTimesheetsWeek';
import { useParams } from 'react-router-dom';
import {
    selectFilterByHasClockedIn,
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
import { isEmpty } from 'lodash';
import { selectServiceIDs } from 'selectors/companyAdmin/services';
import { ERROR_MODAL, GENERATE_TIMESHEET_REPORT } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    selectCompanyUsers,
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { timesheetFilter } from '../breakdown/dayBreakdown/hooks/useOverviewFilters';
import { usePrevious, useQuery } from 'helpers/hooks';
import { days } from 'constants/companyAdmin/timesheets';
import { areArraysEqual } from 'helpers/generic';
import { setCompanyUserIDs } from 'actions/companyAdmin/timesheets/sync/setSelectedCompanyUserID';

const useTimesheets = () => {
    const dispatch = useDispatch();

    const { timeZone } = useSelector(selectCompanySettings);

    const { id } = useParams();

    const query = useQuery();

    const companyUsersIsFetching = useSelector(selectCompanyUsersIsFetching);
    const companyUsersFetchError = useSelector(selectCompanyUsersFetchError);
    const companyUsers = useSelector(selectCompanyUsers);
    const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);

    const timesheetsIsFetching = useSelector(selectTimesheetsIsFetching);
    const timesheetsFetchError = useSelector(selectTimesheetsFetchError);
    const timesheets = useSelector(selectTimesheets);

    const reportGenPins = useSelector(selectUserPinFeeds);
    const isFetchingReportGenPins = useSelector(selectUserPinFeedsIsFetching);
    const errorReportGenPins = useSelector(selectUserPinFeedsFetchError);
    const serviceIDs = useSelector(selectServiceIDs);

    const companyUserIDs = useSelector(timesheetSelectedCompanyIDs);

    const initialDate = query.get('date') || new Date();
    const thisWeek = moment(initialDate).tz(timeZone.id).startOf('isoWeek').format();
    const thisDay = moment(initialDate).tz(timeZone.id).startOf('day').format();

    const [companyUserOptions, setCompanyUserOptions] = useState([]);
    const [timesheetCompanyUserIDs, setTimesheetCompanyUserIDs] = useState([]);
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
        jobReferences: [],
    };
    const totals = timesheets.reduce(
        (acc, timesheet) => {
            timesheet.clockerEntries.forEach((entry, i) => {
                acc[i].formattedHours += entry.formattedHours;
                acc[i].formattedBreakHours += entry.formattedBreakHours;
                acc[i].totalPins += entry.totalPins;
                acc[i].jobReferences = [...acc[i].jobReferences, ...entry.jobReferences];
            });
            return acc;
        },

        new Array(7).fill(dayTotal).map((day, i) => ({
            ...day,
            date: moment(startDate).add(i, 'days').format(),
        })),
    );

    const prevProps = usePrevious({ companyUserIDs, startDate });

    const timesheetsByDay = (filterClockedIn = true) => {
        return [
            ...new Set(
                timesheets
                    .filter(timesheetFilter(filterClockedIn, selectedDate))
                    .map(({ companyUserID }) => companyUserID),
            ),
        ];
    };

    const timesheetsByWeek = (filterClockedIn = true) => {
        return days.reduce((res, _, i) => {
            const currentDate = moment(selectedDate).add(i, 'days').format();
            res = [
                ...res,
                ...new Set(
                    timesheets
                        .filter(timesheetFilter(filterClockedIn, currentDate))
                        .map(({ companyUserID }) => companyUserID),
                ),
            ];

            return res;
        }, []);
    };

    const timesheetsInitialFilter = () => {
        return [...new Set(timesheets.map(({ companyUserID }) => companyUserID))];
    };

    useEffect(() => {
        // on first mount
        dispatch(fetchTimesheetsWeek(companyUserIDs, startDate));
        dispatch(fetchCompanyUsers());

        if (id) {
            dispatch(setCompanyUserIDs([parseInt(id)]));
        }
    }, [dispatch]);

    useEffect(() => {
        if (
            !areArraysEqual(companyUserIDs, prevProps.companyUserIDs) ||
            startDate !== prevProps.startDate
        ) {
            dispatch(fetchTimesheetsWeek(companyUserIDs, startDate));
        }
        // if (!isAllUsers) dispatch(fetchTimesheetsWeek(id, startDate));
        // else console.log('fetch for all users here');
    }, [dispatch, companyUserIDs, startDate]);

    useEffect(() => {
        if (timesheets.length > 1) {
            if (timePeriod === TIME_PERIOD.DAY) {
                setTimesheetCompanyUserIDs(timesheetsByDay(filterByHasClockedIn));
            } else {
                setTimesheetCompanyUserIDs(timesheetsByWeek(filterByHasClockedIn));
            }
        } else {
            setTimesheetCompanyUserIDs(timesheetsInitialFilter());
        }
    }, [timesheets, selectedDate, companyUserIDs, filterByHasClockedIn]);

    useEffect(() => {
        const companyUserOptions = Object.values(companyUsers ?? []).map(getCompanyUserOption);

        setCompanyUserOptions(companyUserOptions);
    }, [companyUsers, timesheetCompanyUserIDs]);

    return {
        startDate,
        selectedDate,
        timePeriod,
        companyUserIDs,
        setCompanyUserIDs,
        companyUserOptions,
        isFetching: timesheetsIsFetching || companyUsersIsFetching,
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

const getCompanyUserOption = companyUser => {
    return {
        value: companyUser.id,
        label: `${companyUser.userFirstName} ${companyUser.userLastName} (${companyUser.userEmail})`,
    };
};

export default useTimesheets;
