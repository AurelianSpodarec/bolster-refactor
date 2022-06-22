import postApproveShift from 'actions/companyAdmin/timesheets/async/postApproveShift';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import React from 'react';
import { useDispatch } from 'react-redux';

const ApproveShiftMenuButton = ({ shiftID }) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(postApproveShift(shiftID));
    };

    return <ActionMenuActionButton text={'Approve'} onClick={handleSubmit} />;
};

export default ApproveShiftMenuButton;
