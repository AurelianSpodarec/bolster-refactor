import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_SUBMIT,
    CREATE_PIN_OPTIONS_VALUE_MODAL,
    EDIT_PIN_OPTIONS_VALUE_MODAL,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import enablePinOptionValue from 'actions/companyAdmin/pinOptions/async/enablePinOptionValue';
import disablePinOptionValue from 'actions/companyAdmin/pinOptions/async/disablePinOptionValue';
import { selectPinOptionSetsPostError } from 'selectors/companyAdmin/pinOptionSets';

const useOptionValueActions = (typeID, setID) => {
    const dispatch = useDispatch();
    const postError = useSelector(selectPinOptionSetsPostError);

    const prevProps = usePrevious({ postError });

    function showAddModal() {
        dispatch(
            showModal(CREATE_PIN_OPTIONS_VALUE_MODAL, {
                pinOptionTypeID: typeID,
                pinOptionSetID: parseInt(setID),
            }),
        );
    }

    function showEditModal(option) {
        dispatch(showModal(EDIT_PIN_OPTIONS_VALUE_MODAL, { option }));
    }

    function showDeleteModal(option) {
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                handleSubmit: () => console.log('delete...'),
                title: `Delete ${option.name}?`,
                message: 'Are you sure you would like to delete this option?',
                submitButtonText: 'Delete',
                submitButtonIcon: 'trash-alt',
            }),
        );
    }

    const enableOptionValue = id => {
        dispatch(enablePinOptionValue(id));
    };

    const disableOptionValue = id => {
        dispatch(disablePinOptionValue(id));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return { showAddModal, showEditModal, showDeleteModal, enableOptionValue, disableOptionValue };
};

export default useOptionValueActions;
