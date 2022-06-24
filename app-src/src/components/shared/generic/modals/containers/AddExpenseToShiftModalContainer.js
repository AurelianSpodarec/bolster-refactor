import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import AddExpenseToShiftModal from '../presentational/AddExpenseToShiftModal';
import { useForm, usePrevious } from 'helpers/hooks';
import {
    selectTimesheetsIsPosting,
    selectTimesheetsPostSuccess,
} from 'selectors/companyAdmin/timesheets';
import postAddExpenseToShift from 'actions/companyAdmin/timesheets/async/postAddExpenseToShift';

const AddExpenseToShiftModalContainer = ({ shiftID }) => {
    const dispatch = useDispatch();

    const [formData, handleChange] = useForm({ name: '', price: '0.00' });

    const isPosting = useSelector(selectTimesheetsIsPosting);
    const postSuccess = useSelector(selectTimesheetsPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);

    const closeModal = () => dispatch(hideModal());

    const handleSubmit = () => {
        dispatch(postAddExpenseToShift(shiftID, formData));
    };

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            closeModal();
        }
    }, [postSuccess, prevPostSuccess]);

    return (
        <AddExpenseToShiftModal
            formData={formData}
            handleChange={handleChange}
            isPosting={isPosting}
            handleSubmit={handleSubmit}
            closeModal={closeModal}
        />
    );
};

export default AddExpenseToShiftModalContainer;
