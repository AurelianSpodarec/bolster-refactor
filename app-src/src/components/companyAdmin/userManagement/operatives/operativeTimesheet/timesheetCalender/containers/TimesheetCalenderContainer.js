import moment from 'moment';
import { useState } from 'react';
import TimesheetCalender from '../presentational/TimesheetCalender';

const TimesheetCalenderContainer = () => {
    const thisWeek = moment(new Date()).startOf('week').add(1, 'days').toISOString();
    const [startDate, setStartDate] = useState(thisWeek);

    const onPrev = () => setStartDate(moment(startDate).subtract(7, 'days').toISOString());
    const onNext = () => setStartDate(moment(startDate).add(7, 'days').toISOString());
    const onToday = () => setStartDate(thisWeek);

    return (
        <TimesheetCalender
            startDate={startDate}
            onPrev={onPrev}
            onNext={onNext}
            onToday={onToday}
        />
    );
};

export default TimesheetCalenderContainer;
