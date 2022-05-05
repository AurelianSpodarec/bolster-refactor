import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_SUBMIT,
    CREATE_ADMIN_PIN_OPTIONS_SET_MODAL,
    EDIT_ADMIN_PIN_OPTIONS_SET_MODAL,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import { selectPinOptionSetsPostError } from '../../../../../selectors/superAdmin/pinOptionSets';

const useOptionSetActions = selectedTypeID => {
    const dispatch = useDispatch();
    const postError = useSelector(selectPinOptionSetsPostError);

    const prevProps = usePrevious({ postError });

    const showAddModal = () => {
        dispatch(
            showModal(CREATE_ADMIN_PIN_OPTIONS_SET_MODAL, {
                pinOptionTypeID: selectedTypeID,
            }),
        );
    };

    const showEditModal = set => {
        dispatch(showModal(EDIT_ADMIN_PIN_OPTIONS_SET_MODAL, { set }));
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

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return {
        showAddModal,
        showEditModal,
        showDeleteModal,
    };
};

export default useOptionSetActions;
