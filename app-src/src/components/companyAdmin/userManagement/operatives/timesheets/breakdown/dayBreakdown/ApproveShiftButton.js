import postApproveShift from 'actions/companyAdmin/timesheets/async/postApproveShift';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimesheetsIsPosting } from 'selectors/companyAdmin/timesheets';

const ApproveShiftButton = ({ shiftID }) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectTimesheetsIsPosting);

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
            disabled={isPosting}
        />
    );
};

export default ApproveShiftButton;
