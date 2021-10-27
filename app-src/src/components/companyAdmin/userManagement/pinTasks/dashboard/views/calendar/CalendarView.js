import React from 'react';
import Calendar from './Calendar';
import CalendarLegend from './CalendarLegend';
import useCalendar from './hooks/useCalendar';

const CalendarView = ({ startDate, startCreatePinTask }) => {
    const { days, matrix, noData, isFetching, error, types, statuses, pinTasks } = useCalendar(
        startDate,
    );

    return (
        <div className="calendar-view size-lg-12">
            <CalendarLegend {...{ types, statuses, pinTasks }} />
            <Calendar
                startDate={startDate}
                startCreatePinTask={startCreatePinTask}
                {...{ days, matrix, noData, isFetching, error }}
            />
        </div>
    );
};

export default CalendarView;
