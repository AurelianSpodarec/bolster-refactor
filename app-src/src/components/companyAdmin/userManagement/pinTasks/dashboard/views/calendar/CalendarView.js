import React from 'react';
import Calendar from './Calendar';
import CalendarLegend from './CalendarLegend';

const CalendarView = ({ startDate, startCreatePinTask }) => {
    return (
        <div className="calendar-view size-lg-12">
            <CalendarLegend />
            <Calendar startDate={startDate} startCreatePinTask={startCreatePinTask} />
        </div>
    );
};

export default CalendarView;
