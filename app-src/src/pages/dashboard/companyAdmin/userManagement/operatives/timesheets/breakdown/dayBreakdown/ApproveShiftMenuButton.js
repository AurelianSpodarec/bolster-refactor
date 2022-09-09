import postApproveShift from 'actions/companyAdmin/timesheets/async/postApproveShift';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import React from 'react';
import { useDispatch } from 'react-redux';
import useIsAdminPlus from '../../../../../../../../hooks/useIsAdminPlus';

const ApproveShiftMenuButton = ({ shiftID }) => {
    const dispatch = useDispatch();
    const isAdminPlus = useIsAdminPlus();

    const handleSubmit = () => {
        dispatch(postApproveShift(shiftID));
    };

    return (
        <ActionMenuActionButton text={'Approve'} onClick={handleSubmit} disabled={!isAdminPlus} />
    );
};

export default ApproveShiftMenuButton;
