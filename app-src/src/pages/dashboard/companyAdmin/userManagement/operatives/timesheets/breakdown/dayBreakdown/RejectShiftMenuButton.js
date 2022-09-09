import postRejectShift from 'actions/companyAdmin/timesheets/async/postRejectShift';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import React from 'react';
import { useDispatch } from 'react-redux';
import useIsAdminPlus from '../../../../../../../../hooks/useIsAdminPlus';

const RejectShiftMenuButton = ({ shiftID }) => {
    const dispatch = useDispatch();
    const isAdminPlus = useIsAdminPlus();

    const handleSubmit = () => {
        dispatch(postRejectShift(shiftID));
    };

    return (
        <ActionMenuActionButton text={'Reject'} onClick={handleSubmit} disabled={!isAdminPlus} />
    );
};

export default RejectShiftMenuButton;
