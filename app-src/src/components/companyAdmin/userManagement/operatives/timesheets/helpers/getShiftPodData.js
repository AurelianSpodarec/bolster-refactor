const getShiftPodData = shift => {
    const {
        // clockerEntries,
        // companyUserID,
        endOn,
        formattedBreakHours,
        // formattedClockedInHours,
        // formattedHours,
        hoursBreakdown, // jobReferenceBreakdowns, totalHours, totalOperatives, totalWageSplit
        groupUID,
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

    console.log(shift);

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
        expenses: [], // { name, cost }
        expensesTotal: 0,
        shiftTotal: 0,
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
