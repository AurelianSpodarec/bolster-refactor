import React from 'react';
import useDayOverview from '../../hooks/useDayOverview';

import BreakdownNotes from '../BreakdownNotes';
import BreakdownSummary from '../BreakdownSummary';

import { timesheetFilter, timesheetSort } from './hooks/useOverviewFilters';

const BreakdownOverviewList = ({
    timesheets,
    selectedDate,
    filterType,
    filterDirection,
    filterByHasClockedIn,
}) => {
    const formattedTimesheets = timesheets
        .filter(timesheetFilter(filterByHasClockedIn, selectedDate))
        .sort(timesheetSort(filterType, filterDirection, selectedDate));

    if (formattedTimesheets.length === 0) return <p>No clock in data to display.</p>;

    return formattedTimesheets.map(timesheet => {
        const {
            companyUserID,
            firstName,
            lastName,
            email,
            formattedHours,
            formattedBreakHours,
            formattedClockedInHours,
            jobReferences,
            totalPins,
            clockIn,
            clockOut,
            clockerNotes,
        } = useDayOverview(timesheet, selectedDate);

        return (
            <div className="day" key={companyUserID}>
                <BreakdownSummary
                    name={`${firstName} ${lastName} (${email})`}
                    formattedHours={formattedHours}
                    formattedBreakHours={formattedBreakHours}
                    formattedClockedInHours={formattedClockedInHours}
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
