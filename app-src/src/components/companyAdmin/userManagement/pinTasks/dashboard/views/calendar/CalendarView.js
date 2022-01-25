import React from 'react';
import Calendar from './Calendar';
import TasksLegend from '../../TasksLegend';
import useCalendar from './hooks/useCalendar';

const CalendarView = ({ startDate, startCreatePinTask }) => {
    const { days, matrix, isFetching, types, statuses, pinTasks } = useCalendar(startDate);

    return (
        <div className="calendar-view size-lg-12">
            <TasksLegend {...{ types, statuses, pinTasks }} />
            <Calendar {...{ startCreatePinTask, startDate, days, matrix, isFetching }} />
        </div>
    );
};

export default CalendarView;
