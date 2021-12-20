const useWeekOverview = timesheet => {
    const { companyUserID, firstName, lastName, email } = timesheet;
    const {
        formattedHours = 0,
        formattedBreakHours = 0,
        jobReferences = [],
        totalPins = 0,
        clockerNotes = [],
    } = timesheet.clockerEntries.reduce(
        (acc, { formattedHours, formattedBreakHours, jobReferences, totalPins, clockerNotes }) => {
            acc.formattedHours += formattedHours;
            acc.formattedBreakHours += formattedBreakHours;
            acc.jobReferences = [...acc.jobReferences, ...jobReferences];
            acc.totalPins += totalPins;
            acc.clockerNotes = [...acc.clockerNotes, ...clockerNotes];
            return acc;
        },
        {
            formattedHours: 0,
            formattedBreakHours: 0,
            jobReferences: [],
            totalPins: 0,
            clockerNotes: [],
        },
    );
    console.log({ clockerNotes });
    return {
        companyUserID,
        firstName,
        lastName,
        email,
        formattedHours,
        formattedBreakHours,
        jobReferences,
        totalPins,
        clockerNotes,
    };
};

export default useWeekOverview;
