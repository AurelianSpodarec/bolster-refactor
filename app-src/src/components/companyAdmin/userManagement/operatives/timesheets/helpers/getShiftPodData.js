const getShiftPodData = shift => {
    const {
        clockerEntries,
        companyUserID,
        endOn,
        formattedBreakHours,
        formattedClockedInHours,
        formattedHours,
        groupUID,
        id,
        lastClockedOutTime,
        overriddenByCompanyUserID,
        overriddenOn,
        overrideShiftTime,
        overrideWage,
        startOn,
        status,
        totalPins,
        notes,
        lateClockIn,
        lateClockOut,
    } = shift;

    const jobReferences = clockerEntries.map(
        ({ uid, jobReference, jobReferenceID, type, totalHours }) => ({
            clockerUID: uid,
            jobRefID: jobReferenceID,
            jobRef: jobReference,
            type,
            hoursWorked: totalHours,
            wageSplit: 0,
        }),
    );

    return {
        timeIn: startOn,
        timeOut: endOn,
        breakTime: formattedBreakHours,
        noOfHistories: 0,
        jobReferences, // { jobRef, hoursWorked, wageSplit }
        jobReferencesTotalHours: formattedClockedInHours,
        jobReferencesTotalCost: 0,
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
