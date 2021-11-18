import React from 'react';
import useDayOverview from '../../hooks/useDayOverview';
import BreakdownNotes from '../BreakdownNotes';
import BreakdownSummary from '../BreakdownSummary';
import { timesheetSort } from './hooks/useOverviewFilters';

const BreakdownOverviewList = ({ timesheets, selectedDate, filterType, filterDirection }) => {
    return timesheets.sort(timesheetSort(filterType, filterDirection)).map(timesheet => {
        const {
            companyUserID,
            firstName,
            lastName,
            formattedHours,
            formattedBreakHours,
            jobReferences,
            totalPins,
            clockIn,
            clockOut,
            clockerNotes,
        } = useDayOverview(timesheet, selectedDate);

        return (
            <div className="day" key={companyUserID}>
                <BreakdownSummary
                    name={`${firstName} ${lastName}`}
                    formattedHours={formattedHours}
                    formattedBreakHours={formattedBreakHours}
                    totalPins={totalPins}
                    clockIn={clockIn}
                    clockOut={clockOut}
                    jobReferences={jobReferences}
                />
                <BreakdownNotes notes={clockerNotes} />
            </div>
        );
    });
};

export default BreakdownOverviewList;
