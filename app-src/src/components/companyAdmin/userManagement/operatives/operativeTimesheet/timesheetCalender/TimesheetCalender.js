import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React from 'react';

import Controls from './Controls';
import WeekTable from './WeekTable';

const TimesheetCalender = ({
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
}) => {
    return (
        <BlockContainer contentClass="timesheet-content-area">
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
                    isFetching={isFetching}
                    fetchError={fetchError}
                    timesheet={timesheet}
                />
            </div>
        </BlockContainer>
    );
};

export default TimesheetCalender;
