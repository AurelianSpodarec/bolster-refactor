import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React from 'react';

import Controls from './Controls';
import WeekTable from './WeekTable';

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
        <BlockContainer>
            <div className="timesheet-calender">
                <Controls
                    startDate={startDate}
                    selectedDate={selectedDate}
                    timePeriod={timePeriod}
                    onPrev={onPrev}
                    onNext={onNext}
                    onToday={onToday}
                    onDaySelect={onDaySelect}
                    onWeekSelect={onWeekSelect}
                />
                <WeekTable
                    startDate={startDate}
                    selectedDate={selectedDate}
                    timePeriod={timePeriod}
                    onDaySelect={onDaySelect}
                    onWeekSelect={onWeekSelect}
                />
            </div>
        </BlockContainer>
    );
};

export default TimesheetCalender;
