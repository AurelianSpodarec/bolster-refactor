import React from 'react';
import { useDispatch } from 'react-redux';

import {
    CONFIRM_SUBMIT,
    CREATE_PIN_OPTIONS_SET_MODAL,
    EDIT_PIN_OPTIONS_SET_MODAL,
} from 'constants/shared/modalTypes';

import showModal from 'actions/shared/generic/modals/sync/showModal';

const useOptionSetActions = selectedTypeID => {
    const dispatch = useDispatch();

    const showAddModal = () => {
        dispatch(
            showModal(CREATE_PIN_OPTIONS_SET_MODAL, {
                pinOptionTypeID: selectedTypeID,
            }),
        );
    };

    function showEditModal(set) {
        dispatch(showModal(EDIT_PIN_OPTIONS_SET_MODAL, { set }));
    }

    function showDeleteModal(set) {
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                handleSubmit: () => console.log('delete...'),
                title: `Delete ${set.name}?`,
                message: 'Are you sure you would like to delete this set?',
                submitButtonText: 'Delete',
                submitButtonIcon: 'trash-alt',
            }),
        );
    }

    return { showAddModal, showEditModal, showDeleteModal };
};

export default useOptionSetActions;
