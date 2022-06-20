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
    } = shift;

    const jobReferences = clockerEntries.map(({ jobReference, totalHours }) => ({
        jobRef: jobReference,
        hoursWorked: totalHours,
        wageSplit: 0,
    }));

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
    };
};

export default getShiftPodData;
