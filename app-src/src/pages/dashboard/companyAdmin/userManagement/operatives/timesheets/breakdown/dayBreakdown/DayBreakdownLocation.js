import React from 'react';
import BreakdownColumns from '../BreakdownColumns';
import BreakdownDetailedTimeline from '../BreakdownDetailedTimeline';
import BreakdownBasicTimeline from '../BreakdownBasicTimeline';
import getTimesheetDay from '../../helpers/getTimesheetDay';

const DayBreakdownLocation = ({ selectedDate, timesheet }) => {
    const day = getTimesheetDay(timesheet, selectedDate);
    const { shifts = [] } = day;
    const clockerEntries = shifts.flatMap(shift => shift.clockerEntries);

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
