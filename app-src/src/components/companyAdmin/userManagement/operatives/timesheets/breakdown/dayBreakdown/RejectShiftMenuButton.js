import postRejectShift from 'actions/companyAdmin/timesheets/async/postRejectShift';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import React from 'react';
import { useDispatch } from 'react-redux';

const RejectShiftMenuButton = ({ shiftID }) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(postRejectShift(shiftID));
    };

    return <ActionMenuActionButton text={'Reject'} onClick={handleSubmit} />;
};

export default RejectShiftMenuButton;
