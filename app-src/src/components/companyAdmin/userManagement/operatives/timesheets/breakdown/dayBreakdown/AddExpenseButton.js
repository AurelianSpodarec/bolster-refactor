import React from 'react';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { useDispatch } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';

const AddExpenseButton = ({ shiftID }) => {
    const dispatch = useDispatch();

    return (
        <ActionButton
            size="small"
            icon="plus"
            text="Create new"
            onClick={() => dispatch(showModal())}
        />
    );
};

export default AddExpenseButton;
