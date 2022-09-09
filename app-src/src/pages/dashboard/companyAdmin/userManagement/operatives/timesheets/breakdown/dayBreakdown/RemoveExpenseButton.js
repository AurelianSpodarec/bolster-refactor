import React from 'react';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { useDispatch } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_DELETE } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import deleteExpenseFromShift from 'actions/companyAdmin/timesheets/async/deleteExpenseFromShift';

const RemoveExpenseButton = ({ shiftID, expenseID }) => {
    const dispatch = useDispatch();

    return (
        <ActionButton
            iconOnly
            icon="trash"
            source="secondary"
            ambient="negative"
            onClick={() =>
                dispatch(
                    showModal(CONFIRM_DELETE, {
                        shiftID,
                        expenseID: expenseID,
                        hideModal: () => {
                            dispatch(hideModal());
                        },
                        handleDelete: () => dispatch(deleteExpenseFromShift(shiftID, expenseID)),
                        message: 'Are you sure you want to delete this expense?',
                    }),
                )
            }
        />
    );
};

export default RemoveExpenseButton;
