import React from 'react';
import Calendar from './Calendar';
import TasksLegend from '../../TasksLegend';
import useCalendar from './hooks/useCalendar';

const CalendarView = ({ startDate, startCreatePinTask }) => {
    const { days, matrix, isFetching, types, statuses, pinTasks } = useCalendar(startDate);

    return (
        <div className="calendar-view size-lg-12">
            <TasksLegend types={types} statuses={statuses} pinTasks={pinTasks} />
            <Calendar
                startCreatePinTask={startCreatePinTask}
                startDate={startDate}
                days={days}
                matrix={matrix}
                isFetching={isFetching}
            />
        </div>
    );
};

export default CalendarView;
