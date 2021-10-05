import React from 'react';
import useWeek from '../../hooks/useWeek';
import BreakdownDaySummary from '../BreakdownDaySummary';

const DayBreakdownOverview = ({ selectedDate }) => {
    const { hours, pins, reference, description } = useWeek(selectedDate) ?? {};

    return (
        <div className="day-breakdown-overview">
            <BreakdownDaySummary
                hours={hours}
                pins={pins}
                reference={reference}
                description={description}
            />
        </div>
    );
};

export default DayBreakdownOverview;
