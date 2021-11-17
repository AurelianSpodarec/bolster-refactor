import useDay from './useDay';
import useTimeline from './useTimeline';

const useDayOverview = (timesheet, selectedDate) => {
    const { companyUserID, firstName, lastName } = timesheet;
    const {
        formattedHours = 0,
        formattedBreakHours = 0,
        jobReferences = [],
        totalPins = 0,
        clockerEntries,
        clockerNotes = [],
    } = useDay(timesheet, selectedDate);

    const timeline = useTimeline(clockerEntries ?? []);
    const clockIn = timeline[0]?.clockIn?.timestamp;
    const clockOut = timeline[timeline.length - 1]?.clockOut?.timestamp;

    return {
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
    };
};

export default useDayOverview;
