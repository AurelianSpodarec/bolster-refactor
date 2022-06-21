import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectFilterByHasClockedIn } from 'selectors/companyAdmin/timesheets';

import { timesheetFilter, timesheetSort } from './hooks/useOverviewFilters';
import { timesheetSelectedCompanyIDs } from 'selectors/companyAdmin/timesheets';
import moment from 'moment';
import { isEmpty } from 'helpers/generic';
import ShiftPod from './ShiftPod';
import useRejectShift from '../hooks/useRejectShift';
import useApproveShift from '../hooks/useApproveShift';
import useDeleteShift from '../hooks/useDeleteShift';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

const BreakdownOverviewList = ({
    timesheets,
    selectedDate,
    startDate,
    sortByType,
    filterByType,
    sortDirection,
}) => {
    const selectedUserIDs = useSelector(timesheetSelectedCompanyIDs);
    const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);
    const companyUsers = useSelector(selectCompanyUsers);
    const shiftsForToday = useMemo(() => {
        try {
            const filteredTimesheets = timesheets.filter(timesheet => {
                const thisUser = companyUsers[timesheet.companyUserID];
                switch (filterByType) {
                    case 'allUsers':
                        if (!thisUser) return false;
                        break;
                    case 'owner':
                        if (!thisUser) return false;
                        return thisUser.type === COMPANY_USER_ROLE_TYPES.OWNER;
                    case 'admin':
                        if (!thisUser) return false;
                        return thisUser.type === COMPANY_USER_ROLE_TYPES.ADMIN;
                    default:
                        break;
                }

                return true;
            });
            return filteredTimesheets.reduce((acc, curr) => {
                const thisDay = curr.days.find(day => moment(day.date).isSame(selectedDate, 'day'));
                const todaysShifts = thisDay.shifts?.map(shift => {
                    const notes = thisDay.clockerNotes.filter(note =>
                        moment(note.createdOn).isSame(selectedDate, 'day'),
                    );
                    return { ...shift, notes };
                });
                return [...acc, ...todaysShifts];
            }, []);
        } catch (e) {
            return [];
        }
    }, [selectedDate, timesheets, filterByType]);

    const [shiftToEdit, setShiftToEdit] = useState(null);

    const { handleShowRejectShiftModal } = useRejectShift(shiftsForToday);
    const { handleShowApproveShiftModal } = useApproveShift(shiftsForToday);
    const { handleShowDeleteShiftModal } = useDeleteShift(shiftsForToday);

    // let formattedTimesheets = [];

    // if (filterByHasClockedIn && selectedUserIDs.length === 0) {
    //     formattedTimesheets = timesheets
    //         .filter(timesheetFilter(filterByHasClockedIn, selectedDate))
    //         .sort(timesheetSort(sortByType, sortDirection, selectedDate));
    // }

    // if (!filterByHasClockedIn && selectedUserIDs.length === 0) {
    //     formattedTimesheets = timesheets.sort(
    //         timesheetSort(sortByType, sortDirection, selectedDate),
    //     );
    // }

    // if (selectedUserIDs.length) {
    //     formattedTimesheets = timesheets
    //         .filter(({ companyUserID }) => selectedUserIDs.includes(companyUserID))
    //         .sort(timesheetSort(sortByType, sortDirection, selectedDate));
    // }

    if (isEmpty(shiftsForToday) || !shiftsForToday?.length)
        return <p>No clock in data to display.</p>;

    return shiftsForToday.map((shift, i) => (
        <ShiftPod
            key={`${i}-${shift.id}`}
            shift={shift}
            shiftToEdit={shiftToEdit}
            setShiftToEdit={setShiftToEdit}
            startDate={startDate}
            handleShowRejectShiftModal={handleShowRejectShiftModal}
            handleShowApproveShiftModal={handleShowApproveShiftModal}
            handleShowDeleteShiftModal={handleShowDeleteShiftModal}
        />
    ));
};

export default BreakdownOverviewList;
