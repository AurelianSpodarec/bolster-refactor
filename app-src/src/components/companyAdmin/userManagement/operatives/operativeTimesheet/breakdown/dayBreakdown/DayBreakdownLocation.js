import React from 'react';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDetailedTimeline from '../BreakdownDetailedTimeline';
import BreakdownBasicTimeline from '../BreakdownBasicTimeline';
import useDay from '../../hooks/useDay';

const DayBreakdownLocation = ({ selectedDate, timesheet }) => {
    const { clockerEntries = [] } = useDay(timesheet, selectedDate);

    return (
        <BreakdownColumns
            className="day-breakdown-location"
            left={
                <BreakdownDetailedTimeline
                    clockerEntries={clockerEntries}
                    selectedDate={selectedDate}
                />
            }
            right={
                <BreakdownBasicTimeline
                    clockerEntries={clockerEntries}
                    selectedDate={selectedDate}
                />
            }
        />
    );
};

export default DayBreakdownLocation;
