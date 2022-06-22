import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import fetchTimesheetsWeek from 'actions/companyAdmin/timesheets/async/fetchTimesheetsWeek';
import {
    selectFilterByHasClockedIn,
    selectTimesheetOptions,
    selectTimesheets,
    selectTimesheetsFetchError,
    selectTimesheetsIsFetching,
    timesheetSelectedCompanyIDs,
    selectTimesheetsPostSuccess,
    selectTimesheetsDeleteSuccess,
    timesheetSelectedJobReferenceIDs,
} from 'selectors/companyAdmin/timesheets';
import {
    selectUserPinFeeds,
    selectUserPinFeedsFetchError,
    selectUserPinFeedsIsFetching,
} from 'selectors/companyAdmin/userPinFeeds';
import {
    selectJobReferences,
    selectJobReferencesIsFetching,
} from 'selectors/companyAdmin/jobReferences';
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
import { areArraysEqual, optionsFormat } from 'helpers/generic';
import { setCompanyUserIDs } from 'actions/companyAdmin/timesheets/sync/setSelectedCompanyUserID';
import { setJobReferenceIDs } from 'actions/companyAdmin/timesheets/sync/setSelectedJobReferenceID';
import fetchTimesheetsWeekDropdownOptions from 'actions/companyAdmin/timesheets/async/fetchTimesheetsWeekDropdownOptions';
import fetchJobReferences from 'actions/companyAdmin/jobReferences/async/fetchJobReferences';
import setTabs from 'actions/shared/generic/tabs/sync/setTabs';
import { TIMESHEETS_TABS } from 'constants/shared/tabNames';
import fetchAllWorkingHours from 'actions/companyAdmin/workingHours/async/fetchAllWorkingHours';

const useTimesheetsOverview = (setTitleData = () => {}) => {
    const dispatch = useDispatch();

    const { timeZone } = useSelector(selectCompanySettings);

    const { id } = useParams();

    const query = useQuery();

    const isBolsterPlusActivated = false;

    const companyUsersIsFetching = useSelector(selectCompanyUsersIsFetching);
    const companyUsersFetchError = useSelector(selectCompanyUsersFetchError);

    const timesheetsIsFetching = useSelector(selectTimesheetsIsFetching);
    const timesheetsFetchError = useSelector(selectTimesheetsFetchError);
    const timesheets = useSelector(selectTimesheets);
    const timesheetOptions = useSelector(selectTimesheetOptions);
    const postSuccess = useSelector(selectTimesheetsPostSuccess);
    const deleteSuccess = useSelector(selectTimesheetsDeleteSuccess);

    const jobReferencesIsFetching = useSelector(selectJobReferencesIsFetching);

    const reportGenPins = useSelector(selectUserPinFeeds);
    const isFetchingReportGenPins = useSelector(selectUserPinFeedsIsFetching);
    const errorReportGenPins = useSelector(selectUserPinFeedsFetchError);
    const serviceIDs = useSelector(selectServiceIDs);
    const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);

    const companyUserIDs = useSelector(timesheetSelectedCompanyIDs);
    const jobReferenceIDs = useSelector(timesheetSelectedJobReferenceIDs);
    const jobReferences = useSelector(selectJobReferences);

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

    const jobReferenceOptions = optionsFormat(jobReferences);

    const onPrev = () => {
        const newStartDate = moment(startDate).subtract(7, 'days').format();
        setTitleData(d => ({ ...d, date: newStartDate }));
        setStartDate(newStartDate);
        setSelectedDate(newStartDate);
    };
    const onNext = () => {
        const newStartDate = moment(startDate).add(7, 'days').format();
        setTitleData(d => ({ ...d, date: newStartDate }));
        setStartDate(newStartDate);
        setSelectedDate(newStartDate);
    };
    const onToday = () => {
        setTitleData({ timePeriod: TIME_PERIOD.DAY, date: thisDay });
        setStartDate(thisWeek);
        setTimePeriod(TIME_PERIOD.DAY);
        setSelectedDate(thisDay);
    };

    const onDaySelect = timestamp => {
        const timezoneDate = moment(timestamp)
            .tz(timeZone?.id ?? 'Europe/London')
            .startOf('day')
            .format();

        setTitleData({ date: timezoneDate, timePeriod: TIME_PERIOD.DAY });
        setTimePeriod(TIME_PERIOD.DAY);
        setSelectedDate(timezoneDate);
    };
    const onWeekSelect = timestamp => {
        const timezoneDate = moment(timestamp)
            .tz(timeZone?.id ?? 'Europe/London')
            .startOf('isoWeek')
            .format();
        setTitleData({ date: timezoneDate, timePeriod: TIME_PERIOD.WEEK });
        setTimePeriod(TIME_PERIOD.WEEK);
        setSelectedDate(timezoneDate);
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
            timesheet.days.forEach((day, i) => {
                acc[i].formattedHours += day.formattedHours;
                acc[i].formattedBreakHours += day.formattedBreakHours;
                acc[i].totalPins += day.totalPins;
                acc[i].jobReferenceIDs = [...acc[i].jobReferenceIDs, ...day.jobReferenceIDs];
                acc[i].date = moment(day.date)
                    .tz(timeZone?.id ?? 'Europe/London')
                    .startOf('day')
                    .format();
            });
            return acc;
        },

        new Array(7).fill(dayTotal).map((day, i) => ({
            ...day,
            date: moment(startDate)
                .tz(timeZone?.id ?? 'Europe/London')
                .startOf('day')
                .add(i, 'days')
                .format(),
        })),
    );

    const formattedTimesheets = timesheets.map(timesheet => {
        return {
            ...timesheet,
            days: timesheet.days.map(day => {
                return {
                    ...day,
                    date: moment(day.date)
                        .tz(timeZone?.id ?? 'Europe/London')
                        .startOf('day')
                        .format(),
                };
            }),
        };
    });

    const prevProps = usePrevious({ companyUserIDs, startDate, postSuccess, deleteSuccess });

    useEffect(() => {
        dispatch(setTabs(Object.values(TIMESHEETS_TABS), TIMESHEETS_TABS.GENERAL_OVERVIEW));
    }, []);

    useEffect(() => {
        if (id) {
            const postBody = [parseInt(id)];
            batch(() => {
                dispatch(setCompanyUserIDs(postBody));
                dispatch(fetchTimesheetsWeek(postBody, [], startDate));
                dispatch(fetchAllWorkingHours());
            });
        } else {
            batch(() => {
                dispatch(fetchTimesheetsWeekDropdownOptions(startDate));
                dispatch(fetchTimesheetsWeek([], [], startDate));
                dispatch(fetchCompanyUsers());
                dispatch(fetchJobReferences());
                dispatch(fetchAllWorkingHours());
            });
        }
    }, [dispatch]);

    useEffect(() => {
        if (
            !areArraysEqual(companyUserIDs, prevProps.companyUserIDs) ||
            startDate !== prevProps.startDate
        ) {
            dispatch(fetchTimesheetsWeek(companyUserIDs, [], startDate));
            dispatch(fetchTimesheetsWeekDropdownOptions(startDate));
        }
    }, [dispatch, companyUserIDs, startDate]);

    useEffect(() => {
        if (
            (postSuccess && !prevProps.postSuccess) ||
            (deleteSuccess && !prevProps.deleteSuccess)
        ) {
            dispatch(fetchTimesheetsWeek(companyUserIDs, [], startDate));
            dispatch(fetchTimesheetsWeekDropdownOptions(startDate));
            dispatch(fetchAllWorkingHours());
        }
    }, [dispatch, postSuccess, deleteSuccess, prevProps.postSuccess, prevProps.deleteSuccess]);

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

    // todo commented out until functionality to check for bolster plus is active so we are not blocking the costing / estimating for other test purposes
    // useEffect(() => {
    //     if (!isBolsterPlusActivated) {
    //         dispatch(showModal(BOLSTER_PLUS_UPGRADE_MODAL));
    //     }
    // }, [dispatch, isBolsterPlusActivated]);

    return {
        startDate,
        selectedDate,
        timePeriod,
        companyUserIDs,
        setCompanyUserIDs,
        companyUserOptions,
        jobReferenceIDs,
        setJobReferenceIDs,
        jobReferenceOptions,
        isFetching: timesheetsIsFetching || companyUsersIsFetching || jobReferencesIsFetching,
        fetchError: timesheetsFetchError || companyUsersFetchError,
        timesheets: formattedTimesheets,
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

export default useTimesheetsOverview;
