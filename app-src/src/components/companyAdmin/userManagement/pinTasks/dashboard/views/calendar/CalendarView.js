import React from 'react';
import Calendar from './Calendar';
import CalendarLegend from './CalendarLegend';

const CalendarView = ({ startDate }) => {
    return (
        <div className="calendar-view size-lg-12">
            <CalendarLegend />
            <Calendar />
        </div>
    );
};

export default CalendarView;
