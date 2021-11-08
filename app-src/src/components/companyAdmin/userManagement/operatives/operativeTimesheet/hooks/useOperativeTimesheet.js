import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import fetchTimesheetWeek from 'actions/companyAdmin/timesheets/async/fetchTimesheetWeek';
import { useParams } from 'react-router-dom';
import {
    selectTimesheet,
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

const useOperativeTimesheet = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { timeZone } = useSelector(selectCompanySettings);

    const { id } = useParams();
    const isAllUsers = id == null;

    const timesheetsIsFetching = useSelector(selectTimesheetsIsFetching);
    const timesheetsFetchError = useSelector(selectTimesheetsFetchError);
    const timesheet = useSelector(selectTimesheet);

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

    useEffect(() => {
        if (!isAllUsers) dispatch(fetchTimesheetWeek(id, startDate));
        else console.log('fetch for all users here');
    }, [dispatch, id, startDate]);

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

    return {
        startDate,
        selectedDate,
        timePeriod,
        isFetching: companyUserIsFetching || timesheetsIsFetching,
        fetchError: companyUserFetchError || timesheetsFetchError,
        timesheet,
        companyUser,
        isAllUsers,
        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
        handlePDFReportGeneration,
    };
};

export default useOperativeTimesheet;
