import postApproveShift from 'actions/companyAdmin/timesheets/async/postApproveShift';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimesheetsIsPosting } from 'selectors/companyAdmin/timesheets';
import useIsAdminPlus from '../../../../../../../../hooks/useIsAdminPlus';

const ApproveShiftButton = ({ shiftID }) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectTimesheetsIsPosting);

    const isAdminPlus = useIsAdminPlus();

    const handleSubmit = () => {
        dispatch(postApproveShift(shiftID));
    };

    return (
        <ActionButton
            icon={isPosting ? 'spinner' : 'check'}
            size="small"
            ambient="positive"
            text={'Approve'}
            onClick={handleSubmit}
            iconSpin={isPosting}
            disabled={isPosting || !isAdminPlus}
        />
    );
};

export default ApproveShiftButton;
