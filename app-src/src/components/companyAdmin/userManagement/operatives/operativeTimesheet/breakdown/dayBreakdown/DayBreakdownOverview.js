import React from 'react';
import useDay from '../../hooks/useDay';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDaySummary from '../BreakdownDaySummary';
import BreakdownNotes from '../BreakdownNotes';

const DayBreakdownOverview = ({ selectedDate }) => {
    const { hours, pins, reference, description, notes } = useDay(selectedDate) ?? {};

    return (
        <BreakdownColumns
            className="day-breakdown-overview"
            left={
                <>
                    <BreakdownDaySummary
                        hours={hours}
                        pins={pins}
                        reference={reference}
                        description={description}
                    />
                    <BreakdownNotes notes={notes} />
                </>
            }
            right={<></>}
        />
    );
};

export default DayBreakdownOverview;
