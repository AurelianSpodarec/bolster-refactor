import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';
import { useState } from 'react';

const useOperativeTimesheet = () => {
    const thisWeek = moment(new Date()).startOf('week').add(1, 'days').toISOString();
    const [startDate, setStartDate] = useState(thisWeek);

    const [selectedDate, setSelectedDate] = useState(moment(new Date()).toISOString());
    const [timePeriod, setTimePeriod] = useState(TIME_PERIOD.DAY);

    const onPrev = () => setStartDate(moment(startDate).subtract(7, 'days').toISOString());
    const onNext = () => setStartDate(moment(startDate).add(7, 'days').toISOString());
    const onToday = () => {
        setStartDate(thisWeek);
        setSelectedDate(moment(new Date()).toISOString());
    };

    const onDaySelect = timestamp => {
        setTimePeriod(TIME_PERIOD.DAY);
        setSelectedDate(timestamp);
    };
    const onWeekSelect = timestamp => {
        setTimePeriod(TIME_PERIOD.WEEK);
        setSelectedDate(timestamp);
    };

    return {
        startDate,
        selectedDate,
        timePeriod,
        onPrev,
        onNext,
        onToday,
        onDaySelect,
        onWeekSelect,
    };
};

export default useOperativeTimesheet;
