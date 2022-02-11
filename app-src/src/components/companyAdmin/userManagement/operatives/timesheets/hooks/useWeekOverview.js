const useWeekOverview = timesheet => {
    const { companyUserID, firstName, lastName, email } = timesheet;
    const {
        formattedHours = 0,
        formattedBreakHours = 0,
        jobReferenceIDs = [],
        totalPins = 0,
        clockerNotes = [],
    } = timesheet.clockerEntries.reduce(
        (
            acc,
            { formattedHours, formattedBreakHours, jobReferenceIDs, totalPins, clockerNotes },
        ) => {
            acc.formattedHours += formattedHours;
            acc.formattedBreakHours += formattedBreakHours;
            acc.jobReferenceIDs = [...acc.jobReferenceIDs, ...jobReferenceIDs];
            acc.totalPins += totalPins;
            acc.clockerNotes = [...acc.clockerNotes, ...clockerNotes];
            return acc;
        },
        {
            formattedHours: 0,
            formattedBreakHours: 0,
            jobReferenceIDs: [],
            totalPins: 0,
            clockerNotes: [],
        },
    );

    return {
        companyUserID,
        firstName,
        lastName,
        email,
        formattedHours,
        formattedBreakHours,
        jobReferenceIDs,
        totalPins,
        clockerNotes,
    };
};

export default useWeekOverview;
