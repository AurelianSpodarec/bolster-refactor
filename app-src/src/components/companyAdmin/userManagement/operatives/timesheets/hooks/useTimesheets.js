import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import fetchTimesheetsWeek from 'actions/companyAdmin/timesheets/async/fetchTimesheetsWeek';
import { useParams, useLocation } from 'react-router-dom';
import {
    selectTimesheets,
    selectTimesheetsFetchError,
    selectTimesheetsIsFetching,
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
import { useQuery } from 'helpers/hooks';
import { days } from 'constants/companyAdmin/timesheets';

const useTimesheets = () => {
    const dispatch = useDispatch();

    const { timeZone } = useSelector(selectCompanySettings);

    const { id } = useParams();

    const query = useQuery();

    const companyUsersIsFetching = useSelector(selectCompanyUsersIsFetching);
    const companyUsersFetchError = useSelector(selectCompanyUsersFetchError);
    const companyUsers = useSelector(selectCompanyUsers);

    const timesheetsIsFetching = useSelector(selectTimesheetsIsFetching);
    const timesheetsFetchError = useSelector(selectTimesheetsFetchError);
    const timesheets = useSelector(selectTimesheets);

    const reportGenPins = useSelector(selectUserPinFeeds);
    const isFetchingReportGenPins = useSelector(selectUserPinFeedsIsFetching);
    const errorReportGenPins = useSelector(selectUserPinFeedsFetchError);
    const serviceIDs = useSelector(selectServiceIDs);

    const initialDate = query.get('date') || new Date();
    const thisWeek = moment(initialDate).tz(timeZone.id).startOf('isoWeek').format();
    const thisDay = moment(initialDate).tz(timeZone.id).startOf('day').format();

    const [companyUserOptions, setCompanyUserOptions] = useState([]);
    const [timesheetCompanyUserIDs, setTimesheetCompanyUserIDs] = useState([]);
    const [startDate, setStartDate] = useState(thisWeek);
    const [selectedDate, setSelectedDate] = useState(thisDay);
    const [timePeriod, setTimePeriod] = useState(TIME_PERIOD.DAY);
    const [companyUserIDs, setCompanyUserIDs] = useState(id ? [parseInt(id)] : []);
    const [filterByHasClockedIn, setFilterByHasClockedIn] = useState(!id);

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

    useEffect(() => {
        dispatch(fetchTimesheetsWeek(companyUserIDs, startDate));
        // if (!isAllUsers) dispatch(fetchTimesheetsWeek(id, startDate));
        // else console.log('fetch for all users here');
    }, [dispatch, companyUserIDs, startDate]);

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, [dispatch]);

    useEffect(() => {
        if (filterByHasClockedIn) {
            if (timePeriod === TIME_PERIOD.DAY) {
                setTimesheetCompanyUserIDs([
                    ...new Set(
                        timesheets
                            .filter(timesheetFilter(true, selectedDate))
                            .map(({ companyUserID }) => companyUserID),
                    ),
                ]);
            } else {
                const weekCompanyUserOptions = days.reduce((res, _, i) => {
                    const currentDate = moment(selectedDate).add(i, 'days').format();
                    res = [
                        ...res,
                        ...new Set(
                            timesheets
                                .filter(timesheetFilter(true, currentDate))
                                .map(({ companyUserID }) => companyUserID),
                        ),
                    ];

                    return res;
                }, []);

                setTimesheetCompanyUserIDs(weekCompanyUserOptions);
            }
        } else {
            setTimesheetCompanyUserIDs([
                ...new Set(timesheets.map(({ companyUserID }) => companyUserID)),
            ]);
        }
    }, [timesheets, selectedDate, companyUserIDs, filterByHasClockedIn]);

    useEffect(() => {
        setCompanyUserOptions(
            companyUsers != null
                ? Object.values(companyUsers)
                      .filter(filterHasClockInData(timesheetCompanyUserIDs))
                      .map(getCompanyUserOption)
                : [],
        );
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
        filterByHasClockedIn,
        setFilterByHasClockedIn,
        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
        handlePDFReportGeneration,
    };
};

const filterHasClockInData = timesheetCompanyUserIDs => companyUser => {
    const { id } = companyUser;

    return timesheetCompanyUserIDs.includes(id);
};

const getCompanyUserOption = companyUser => {
    return {
        value: companyUser.id,
        label: `${companyUser.userFirstName} ${companyUser.userLastName} (${companyUser.userEmail})`,
    };
};

export default useTimesheets;
