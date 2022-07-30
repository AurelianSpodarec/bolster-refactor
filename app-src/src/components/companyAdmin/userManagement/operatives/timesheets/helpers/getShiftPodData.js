const getShiftPodData = shift => {
    const {
        // clockerEntries,
        // companyUserID,
        endOn,
        formattedBreakHours,
        // formattedClockedInHours,
        // formattedHours,
        hoursBreakdown, // jobReferenceBreakdowns, totalHours, totalOperatives, totalWageSplit, totalExpenses, overallTotal
        groupUID,
        expenses,
        // id,
        // lastClockedOutTime,
        // overriddenByCompanyUserID,
        // overriddenOn,
        overrideShiftTime,
        overrideWage,
        startOn,
        status,
        // totalPins,
        notes,
        lateClockIn,
        lateClockOut,
    } = shift;

    const jobReferences = hoursBreakdown.jobReferenceBreakdowns.map(
        ({ jobReferenceName, jobReferenceID, totalHours, totalWageSplit }) => ({
            jobRefID: jobReferenceID,
            jobRef: jobReferenceName,
            hoursWorked: totalHours,
            wageSplit: totalWageSplit,
        }),
    );

    return {
        timeIn: startOn,
        timeOut: endOn,
        breakTime: formattedBreakHours,
        noOfHistories: 0,
        jobReferences, // { jobRef, hoursWorked, wageSplit }
        jobReferencesTotalHours: hoursBreakdown.totalHours,
        jobReferencesTotalCost: hoursBreakdown.totalWageSplit,
        expenses, // { name, price }
        expensesTotal: hoursBreakdown.totalExpenses,
        shiftTotal: hoursBreakdown.overallTotal,
        notes,
        status,
        groupUID,
        overrideShiftTime,
        overrideWage,
        lateClockIn,
        lateClockOut,
    };
};

export default getShiftPodData;
