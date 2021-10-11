import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';
import { useEffect, useState } from 'react';
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

const useOperativeTimesheet = () => {
    const dispatch = useDispatch();

    const { timeZone } = useSelector(selectCompanySettings);

    const { id } = useParams();

    const timesheetsIsFetching = useSelector(selectTimesheetsIsFetching);
    const timesheetsFetchError = useSelector(selectTimesheetsFetchError);
    const timesheet = useSelector(selectTimesheet);

    const {
        isFetching: companyUserIsFetching,
        fetchError,
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

    useEffect(() => {
        dispatch(fetchTimesheetWeek(id, startDate));
    }, [dispatch, id, startDate]);

    return {
        startDate,
        selectedDate,
        timePeriod,

        isFetching: companyUserIsFetching || timesheetsIsFetching,
        fetchError: companyUserFetchError || timesheetsFetchError,
        timesheet,
        companyUser,

        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
    };
};

export default useOperativeTimesheet;
