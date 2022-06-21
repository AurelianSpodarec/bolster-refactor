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
import { selectWorkingHours } from 'selectors/companyAdmin/workingHours';

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
    const workingHours = useSelector(selectWorkingHours);

    const shiftsForToday = useMemo(() => {
        try {
            const filteredTimesheets = timesheets.filter(timesheet => {
                const thisUser = companyUsers[timesheet.companyUserID];
                switch (filterByType) {
                    case 'allUsers':
                        break;
                    case 'owner':
                        if (!thisUser) return false;
                        return thisUser.type === COMPANY_USER_ROLE_TYPES.OWNER;
                    case 'admin':
                        if (!thisUser) return false;
                        return thisUser.type === COMPANY_USER_ROLE_TYPES.ADMIN;
                    case 'withSetHours':
                        if (!thisUser) return false;
                        return workingHours.some(hour => hour.companyUserID === thisUser?.ID);
                    case 'withoutSetHours':
                        if (!thisUser) return false;
                        return !workingHours.some(hour => hour.companyUserID === thisUser?.ID);
                    case 'withSetWages':
                        return !!thisUser?.companyPayRateID;
                    case 'withoutSetWages':
                        if (!thisUser) return false;
                        return !thisUser.companyPayRateID;
                    default:
                        break;
                }

                return true;
            });
            const sortedTimesheets = filteredTimesheets
                .reduce((acc, curr) => {
                    const thisDay = curr.days.find(day =>
                        moment(day.date).isSame(selectedDate, 'day'),
                    );
                    const todaysShifts = thisDay.shifts?.map(shift => {
                        const notes = thisDay.clockerNotes.filter(note =>
                            moment(note.createdOn).isSame(selectedDate, 'day'),
                        );
                        return { ...shift, notes };
                    });
                    return [...acc, ...todaysShifts];
                }, [])
                .sort((a, b) => {
                    console.log(a);
                    const userA = companyUsers[a.companyUserID];
                    const userB = companyUsers[b.companyUserID];
                    switch (sortByType) {
                        case 'name':
                            return `${userA?.firstName} ${userA?.lastName}`.localeCompare(
                                `${userB?.firstName} ${userB?.lastName}`,
                            );
                        case 'time':
                            return moment(a.lastClockedOutTime).diff(
                                moment(b.lastClockedOutTime),
                                'milliseconds',
                            );
                        case 'hours':
                            return a.formattedClockedInHours - b.formattedClockedInHours;
                        default:
                            return 0;
                    }
                });
            if (!sortDirection) return sortedTimesheets.reverse();
            return sortedTimesheets;
        } catch (e) {
            return [];
        }
    }, [selectedDate, timesheets, filterByType, sortByType, sortDirection]);

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
