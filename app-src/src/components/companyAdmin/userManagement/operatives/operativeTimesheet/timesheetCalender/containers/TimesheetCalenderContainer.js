import React from 'react';

import TimesheetCalender from '../presentational/TimesheetCalender';

const TimesheetCalenderContainer = ({
    startDate,
    selectedDate,
    timePeriod,
    onPrev,
    onNext,
    onToday,
    onDaySelect,
    onWeekSelect,
}) => {
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
