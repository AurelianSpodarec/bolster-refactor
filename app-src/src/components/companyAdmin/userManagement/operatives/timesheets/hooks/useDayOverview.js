import useDay from './useDay';
import useTimeline from './useTimeline';

// todo refactor this to not incorrectly be named like a hook
const useDayOverview = (timesheet, selectedDate) => {
    const { companyUserID, firstName, lastName, email } = timesheet;
    const {
        formattedHours = 0,
        formattedBreakHours = 0,
        formattedClockedInHours = 0,
        jobReferenceIDs = [],
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
        email,
        formattedHours,
        formattedBreakHours,
        formattedClockedInHours,
        jobReferenceIDs,
        totalPins,
        clockIn,
        clockOut,
        clockerNotes,
    };
};

export default useDayOverview;
