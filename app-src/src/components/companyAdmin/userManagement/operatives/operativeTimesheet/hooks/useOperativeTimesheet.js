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

const useOperativeTimesheet = () => {
    const dispatch = useDispatch();

    const { timeZone } = useSelector(selectCompanySettings);

    const isFetching = useSelector(selectTimesheetsIsFetching);
    const fetchError = useSelector(selectTimesheetsFetchError);
    const timesheet = useSelector(selectTimesheet);

    const { id } = useParams();

    const thisWeek = moment(new Date())
        .tz(timeZone.id)
        .startOf('isoWeek')
        .add(1, 'day')
        .toISOString();

    const thisDay = moment(new Date()).tz(timeZone.id).startOf('day').toISOString();

    const [startDate, setStartDate] = useState(thisWeek);
    const [selectedDate, setSelectedDate] = useState(thisDay);
    const [timePeriod, setTimePeriod] = useState(TIME_PERIOD.DAY);

    const onPrev = () => setStartDate(moment(startDate).subtract(7, 'days').toISOString());
    const onNext = () => setStartDate(moment(startDate).add(7, 'days').toISOString());
    const onToday = () => {
        setStartDate(thisWeek);
        setSelectedDate(thisDay);
        setTimePeriod(TIME_PERIOD.DAY);
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

    useEffect(() => {
        setSelectedDate(startDate);
    }, [startDate]);

    useEffect(() => {
        onToday();
    }, []);

    return {
        startDate,
        selectedDate,
        timePeriod,

        isFetching,
        fetchError,
        timesheet,

        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
    };
};

export default useOperativeTimesheet;
