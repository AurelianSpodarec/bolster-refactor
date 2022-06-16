import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectFilterByHasClockedIn } from 'selectors/companyAdmin/timesheets';
import useDayOverview from '../../hooks/useDayOverview';

import BreakdownNotes from '../BreakdownNotes';
import BreakdownSummary from '../BreakdownSummary';

import { timesheetFilter, timesheetSort } from './hooks/useOverviewFilters';
import { timesheetSelectedCompanyIDs } from 'selectors/companyAdmin/timesheets';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import moment from 'moment';
import getShiftPodData from '../../helpers/getShiftPodData';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';

const BreakdownOverviewList = ({ timesheets, selectedDate, filterType, filterDirection }) => {
    const selectedUserIDs = useSelector(timesheetSelectedCompanyIDs);

    const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);

    const users = useSelector(selectCompanyUsers);

    const selectedDay = useMemo(() => {
        const getDayMatch = day => moment(day.date).isSame(selectedDate, 'day');
        const thisDay = timesheets.reduce((acc, curr) => {
            return curr.days.find(getDayMatch);
        }, undefined);
        return thisDay;
    }, [selectedDate, timesheets]);

    // let formattedTimesheets = [];

    // if (filterByHasClockedIn && selectedUserIDs.length === 0) {
    //     formattedTimesheets = timesheets
    //         .filter(timesheetFilter(filterByHasClockedIn, selectedDate))
    //         .sort(timesheetSort(filterType, filterDirection, selectedDate));
    // }

    // if (!filterByHasClockedIn && selectedUserIDs.length === 0) {
    //     formattedTimesheets = timesheets.sort(
    //         timesheetSort(filterType, filterDirection, selectedDate),
    //     );
    // }

    // if (selectedUserIDs.length) {
    //     formattedTimesheets = timesheets
    //         .filter(({ companyUserID }) => selectedUserIDs.includes(companyUserID))
    //         .sort(timesheetSort(filterType, filterDirection, selectedDate));
    // }

    if (!selectedDay || !selectedDay?.shifts?.length) return <p>No clock in data to display.</p>;

    console.log({ timesheets, selectedDate, selectedDay, users });

    return selectedDay.shifts.map(shift => {
        // const {
        //     companyUserID,
        //     firstName,
        //     lastName,
        //     email,
        //     formattedHours,
        //     formattedBreakHours,
        //     formattedClockedInHours,
        //     jobReferenceIDs,
        //     totalPins,
        //     clockIn,
        //     clockOut,
        //     clockerNotes,
        // } = useDayOverview(timesheet, selectedDate);

        const user = users[shift.companyUserID] || {};

        const {
            timeIn,
            timeOut,
            breakTime,
            noOfHistories,
            jobReferences, // { jobRef, hoursWorked, wageSplit }
            jobReferencesTotalHours,
            jobReferencesTotalCost,
            expenses, // { name, cost }
            expensesTotal,
            shiftTotal,
            notes,
            status,
            groupUID,
        } = getShiftPodData(shift);

        return (
            <BlockContainer key={groupUID} containerClass={`shift-pod`}>
                <BlockHeading
                    title={`${user.userFirstName} ${user.userLastName} (${user.userEmail})`}
                />
            </BlockContainer>
        );
    });
};

// <div className="day" key={companyUserID}>
//     <BreakdownSummary
//         name={`${firstName} ${lastName} (${email})`}
//         formattedHours={formattedHours}
//         formattedBreakHours={formattedBreakHours}
//         formattedClockedInHours={formattedClockedInHours}
//         totalPins={totalPins}
//         clockIn={clockIn}
//         clockOut={clockOut}
//         jobReferenceIDs={jobReferenceIDs}
//     />
//     <BreakdownNotes notes={clockerNotes} />
// </div>

export default BreakdownOverviewList;
