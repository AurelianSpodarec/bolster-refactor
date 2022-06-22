import React, { useState } from 'react';
import { isEmpty } from 'helpers/generic';
import ShiftPod from './ShiftPod';
import useDeleteShift from '../hooks/useDeleteShift';

const BreakdownOverviewList = ({ startDate, shiftsForToday = [] }) => {
    const [shiftToEdit, setShiftToEdit] = useState(null);

    const { handleShowDeleteShiftModal } = useDeleteShift(shiftsForToday);

    if (isEmpty(shiftsForToday) || !shiftsForToday?.length)
        return <p>No clock in data to display.</p>;

    return shiftsForToday.map((shift, i) => (
        <ShiftPod
            key={`${i}-${shift.id}`}
            shift={shift}
            shiftToEdit={shiftToEdit}
            setShiftToEdit={setShiftToEdit}
            startDate={startDate}
            handleShowDeleteShiftModal={handleShowDeleteShiftModal}
        />
    ));
};

export default BreakdownOverviewList;
