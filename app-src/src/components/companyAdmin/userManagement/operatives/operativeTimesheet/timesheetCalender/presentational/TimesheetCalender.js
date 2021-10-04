import React from 'react';

import ControlsContainer from '../containers/ControlsContainer';
import WeekTableContainer from '../containers/WeekTableContainer';

const TimesheetCalender = ({
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
        <div className="timesheet-calender">
            <ControlsContainer
                startDate={startDate}
                selectedDate={selectedDate}
                timePeriod={timePeriod}
                onPrev={onPrev}
                onNext={onNext}
                onToday={onToday}
                onDaySelect={onDaySelect}
                onWeekSelect={onWeekSelect}
            />
            <WeekTableContainer
                startDate={startDate}
                selectedDate={selectedDate}
                timePeriod={timePeriod}
                onDaySelect={onDaySelect}
                onWeekSelect={onWeekSelect}
            />
        </div>
    );
};

export default TimesheetCalender;
