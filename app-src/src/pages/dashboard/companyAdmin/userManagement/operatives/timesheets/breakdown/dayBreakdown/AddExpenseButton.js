import React from 'react';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import { useDispatch } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { ADD_EXPENSE_TO_SHIFT } from 'constants/shared/modalTypes';

const AddExpenseButton = ({ shiftID }) => {
    const dispatch = useDispatch();

    return (
        <ActionButton
            size="small"
            icon="plus"
            text="Create new"
            onClick={() => dispatch(showModal(ADD_EXPENSE_TO_SHIFT, { shiftID }))}
        />
    );
};

export default AddExpenseButton;
