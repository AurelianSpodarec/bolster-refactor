import { TIME_PERIOD } from '../../../../../../../constants/companyAdmin/enums';
import moment from 'moment';
import { useState } from 'react';
import TimesheetCalender from '../presentational/TimesheetCalender';

const TimesheetCalenderContainer = () => {
    const thisWeek = moment(new Date()).startOf('week').add(1, 'days').toISOString();
    const [startDate, setStartDate] = useState(thisWeek);

    const [selectedDate, setSelectedDate] = useState(moment(new Date()).toISOString());
    const [timePeriod, setTimePeriod] = useState(TIME_PERIOD.DAY);

    const onPrev = () => setStartDate(moment(startDate).subtract(7, 'days').toISOString());
    const onNext = () => setStartDate(moment(startDate).add(7, 'days').toISOString());
    const onToday = () => setStartDate(thisWeek);

    const onDaySelect = timestamp => {
        setTimePeriod(TIME_PERIOD.DAY);
        setSelectedDate(timestamp);
    };
    const onWeekSelect = () => setTimePeriod(TIME_PERIOD.WEEK);

    return (
        <TimesheetCalender
            startDate={startDate}
            selectedDate={selectedDate}
            timePeriod={timePeriod}
            onPrev={onPrev}
            onNext={onNext}
            onToday={onToday}
            onDaySelect={onDaySelect}
            onWeekSelect={onWeekSelect}
        />
    );
};

export default TimesheetCalenderContainer;
