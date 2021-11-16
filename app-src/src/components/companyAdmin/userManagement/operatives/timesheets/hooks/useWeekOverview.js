const useWeekOverview = timesheet => {
    const { companyUserID, firstName, lastName } = timesheet;
    const {
        formattedHours,
        formattedBreakHours,
        jobReferences,
        totalPins,
    } = timesheet.clockerEntries.reduce(
        (acc, { formattedHours, formattedBreakHours, jobReferences, totalPins }) => {
            acc.formattedHours += formattedHours;
            acc.formattedBreakHours += formattedBreakHours;
            acc.jobReferences = [...acc.jobReferences, ...jobReferences];
            acc.totalPins += totalPins;
            return acc;
        },
        {
            formattedHours: 0,
            formattedBreakHours: 0,
            jobReferences: [],
            totalPins: 0,
        },
    );

    return {
        companyUserID,
        firstName,
        lastName,
        formattedHours,
        formattedBreakHours,
        jobReferences,
        totalPins,
    };
};

export default useWeekOverview;
