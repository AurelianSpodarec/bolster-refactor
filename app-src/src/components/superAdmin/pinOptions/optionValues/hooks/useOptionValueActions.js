import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CONFIRM_SUBMIT, ERROR_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import {
    selectPinOptionsIsPosting,
    selectPinOptionsPostError,
} from '../../../../../selectors/superAdmin/pinOptions';

import enablePinOptionValue from '../../../../../actions/superAdmin/pinOptions/async/enablePinOptionValue';
import disablePinOptionValue from '../../../../../actions/superAdmin/pinOptions/async/disablePinOptionValue';

const useOptionValueActions = (typeID, setID) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);

    const prevProps = usePrevious({ postError });

    const showAddModal = () => {
        // dispatch(
        //     showModal(CREATE_PIN_OPTIONS_VALUE_MODAL, {
        //         pinOptionTypeID: typeID,
        //         pinOptionSetID: parseInt(setID),
        //     }),
        // );
    };

    const showEditModal = option => {
        // dispatch(showModal(EDIT_PIN_OPTIONS_VALUE_MODAL, { option }));
    };

    const showDeleteModal = option => {
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                handleSubmit: () => console.log('delete...'),
                title: `Delete ${option.name}?`,
                message: 'Are you sure you would like to delete this option?',
                submitButtonText: 'Delete',
                submitButtonIcon: 'trash-alt',
            }),
        );
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return { showAddModal, showEditModal, showDeleteModal };
};

export default useOptionValueActions;
