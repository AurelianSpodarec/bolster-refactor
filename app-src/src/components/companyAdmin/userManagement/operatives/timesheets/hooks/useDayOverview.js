import useDay from './useDay';
import useTimeline from './useTimeline';

const useDayOverview = (timesheet, selectedDate) => {
    const { companyUserID, firstName, lastName } = timesheet;
    const {
        formattedHours,
        formattedBreakHours,
        jobReferences,
        totalPins,
        clockerEntries,
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
    };
};

export default useDayOverview;
