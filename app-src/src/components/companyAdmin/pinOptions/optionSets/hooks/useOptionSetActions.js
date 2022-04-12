import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_SUBMIT,
    CREATE_PIN_OPTIONS_SET_MODAL,
    EDIT_PIN_OPTIONS_SET_MODAL,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import enablePinOptionSet from 'actions/companyAdmin/pinOptions/async/enablePinOptionSet';
import disablePinOptionSet from 'actions/companyAdmin/pinOptions/async/disablePinOptionSet';
import {
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
} from 'selectors/companyAdmin/pinOptionSets';

const useOptionSetActions = selectedTypeID => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);

    const prevProps = usePrevious({ postError });

    const showAddModal = () => {
        dispatch(
            showModal(CREATE_PIN_OPTIONS_SET_MODAL, {
                pinOptionTypeID: selectedTypeID,
            }),
        );
    };

    const showEditModal = set => {
        dispatch(showModal(EDIT_PIN_OPTIONS_SET_MODAL, { set }));
    };

    const showDeleteModal = set => {
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                handleSubmit: () => console.log('delete...'),
                title: `Delete ${set.name}?`,
                message: 'Are you sure you would like to delete this set?',
                submitButtonText: 'Delete',
                submitButtonIcon: 'trash-alt',
            }),
        );
    };

    const enableOptionSet = set => {
        if (!isPosting) dispatch(enablePinOptionSet(set));
    };

    const disableOptionSet = set => {
        if (!isPosting) dispatch(disablePinOptionSet(set));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return { showAddModal, showEditModal, showDeleteModal, enableOptionSet, disableOptionSet };
};

export default useOptionSetActions;
