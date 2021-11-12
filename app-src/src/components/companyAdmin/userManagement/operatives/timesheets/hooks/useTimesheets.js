import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import fetchTimesheetsWeek from 'actions/companyAdmin/timesheets/async/fetchTimesheetsWeek';
import { useParams } from 'react-router-dom';
import {
    selectTimesheets,
    selectTimesheetsFetchError,
    selectTimesheetsIsFetching,
} from 'selectors/companyAdmin/timesheets';
import useFetchCompanyUser from '../../../../hooks/useFetchCompanyUser';
import postReport from 'actions/companyAdmin/reports/async/postReport';
import { selectUserPinFeed } from 'selectors/companyAdmin/userPinFeed';
import { isEmpty } from 'lodash';
import { selectServiceIDs } from 'selectors/companyAdmin/services';
import { reportPostSuccess } from 'selectors/companyAdmin/timesheets';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { usePrevious } from 'helpers/hooks';
import {
    selectCompanyUsers,
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

const useTimesheets = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { timeZone } = useSelector(selectCompanySettings);

    const { id } = useParams();

    const companyUsersIsFetching = useSelector(selectCompanyUsersIsFetching);
    const companyUsersFetchError = useSelector(selectCompanyUsersFetchError);
    const companyUsers = useSelector(selectCompanyUsers);

    const timesheetsIsFetching = useSelector(selectTimesheetsIsFetching);
    const timesheetsFetchError = useSelector(selectTimesheetsFetchError);
    const timesheets = useSelector(selectTimesheets);

    const reportGenPins = useSelector(selectUserPinFeed);
    const serviceIDs = useSelector(selectServiceIDs);
    const reportSuccess = useSelector(reportPostSuccess);
    const prevReportPostSuccess = usePrevious(reportSuccess);

    const {
        isFetching: companyUserIsFetching,
        companyUserFetchError,
        companyUser,
    } = useFetchCompanyUser(id);

    const thisWeek = moment(new Date()).tz(timeZone.id).startOf('isoWeek').format();

    const thisDay = moment(new Date()).tz(timeZone.id).startOf('day').format();

    const [startDate, setStartDate] = useState(thisWeek);
    const [selectedDate, setSelectedDate] = useState(thisDay);
    const [timePeriod, setTimePeriod] = useState(TIME_PERIOD.DAY);
    const [companyUserIDs, setCompanyUserIDs] = useState(id ? [parseInt(id)] : []);

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
        if (isEmpty(reportGenPins)) return;

        const hierarchyID = [...new Set(reportGenPins.map(({ drawingID }) => drawingID))];
        const pinIDs = [...new Set(reportGenPins.map(({ pinID }) => pinID))];

        const postBody = {
            hierarchyType: 'drawing',
            hierarchyID,
            pinIDs,
            isPDFGeneration: true,
            fromDateInclusive: startDate,
            toDateInclusive: moment(selectedDate).endOf(timePeriod).format(),
            sortBy: 3,
            reportHistories: 1,
            serviceID: serviceIDs,
        };

        dispatch(postReport(postBody));
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
        if (reportSuccess && !prevReportPostSuccess) {
            dispatch(
                showModal(SUCCESS_MODAL, {
                    message: 'Your report is now being generated',
                }),
            );

            return history.push('/company/reports');
        }
    }, [reportSuccess, prevReportPostSuccess]);

    const companyUserOptions =
        companyUsers != null ? Object.values(companyUsers).map(getCompanyUserOption) : [];

    return {
        startDate,
        selectedDate,
        timePeriod,
        companyUserIDs,
        setCompanyUserIDs,
        companyUserOptions,
        isFetching: companyUserIsFetching || timesheetsIsFetching || companyUsersIsFetching,
        fetchError: companyUserFetchError || timesheetsFetchError || companyUsersFetchError,
        timesheets,
        totals,
        companyUser,
        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
        handlePDFReportGeneration,
    };
};

const getCompanyUserOption = companyUser => ({
    value: companyUser.id,
    label: `${companyUser.userFirstName} ${companyUser.userLastName}`,
});

export default useTimesheets;
