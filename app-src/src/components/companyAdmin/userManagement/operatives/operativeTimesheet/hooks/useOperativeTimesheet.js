import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

const useOperativeTimesheet = () => {
    const { timeZone } = useSelector(selectCompanySettings);

    const thisWeek = moment(new Date())
        .tz(timeZone.id)
        .startOf('week')
        .add(1, 'days')
        .toISOString();
    const [startDate, setStartDate] = useState(thisWeek);

    const [selectedDate, setSelectedDate] = useState(moment(new Date()).toISOString());
    const [timePeriod, setTimePeriod] = useState(TIME_PERIOD.DAY);

    const onPrev = () => setStartDate(moment(startDate).subtract(7, 'days').toISOString());
    const onNext = () => setStartDate(moment(startDate).add(7, 'days').toISOString());
    const onToday = () => {
        setStartDate(thisWeek);
        setSelectedDate(moment(new Date()).tz(timeZone.id).toISOString());
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
