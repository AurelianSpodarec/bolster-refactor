import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectFilterByHasClockedIn } from 'selectors/companyAdmin/timesheets';

import { timesheetFilter, timesheetSort } from './hooks/useOverviewFilters';
import { timesheetSelectedCompanyIDs } from 'selectors/companyAdmin/timesheets';
import moment from 'moment';
import { isEmpty } from 'helpers/generic';
import ShiftPod from './ShiftPod';
import useRejectShift from '../hooks/useRejectShift';
import useApproveShift from '../hooks/useApproveShift';

const BreakdownOverviewList = ({
    timesheets,
    selectedDate,
    startDate,
    filterType,
    filterDirection,
}) => {
    const selectedUserIDs = useSelector(timesheetSelectedCompanyIDs);
    const filterByHasClockedIn = useSelector(selectFilterByHasClockedIn);

    const shiftsForToday = useMemo(() => {
        try {
            return timesheets.reduce((acc, curr) => {
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
    }, [selectedDate, timesheets]);

    const [shiftToEdit, setShiftToEdit] = useState(null);

    const { handleShowRejectShiftModal } = useRejectShift(shiftsForToday);
    const { handleShowApproveShiftModal } = useApproveShift(shiftsForToday);

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
        />
    ));
};

export default BreakdownOverviewList;
