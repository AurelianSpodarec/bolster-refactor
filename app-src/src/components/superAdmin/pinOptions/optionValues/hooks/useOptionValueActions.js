import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_DELETE,
    CREATE_ADMIN_PIN_OPTIONS_VALUE_MODAL,
    EDIT_ADMIN_PIN_OPTIONS_VALUE_MODAL,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import {
    selectPinOptionsDeleteError,
    selectPinOptionsDeleteSuccess,
    selectPinOptionsIsDeleting,
    selectPinOptionsIsPosting,
    selectPinOptionsPostError,
} from '../../../../../selectors/superAdmin/pinOptions';
import deletePinOption from '../../../../../actions/superAdmin/pinOptions/async/deletePinOption';
import { hideModal } from '../../../../../actions/shared/generic/modals/sync/hideModal';

const useOptionValueActions = (typeID, setID) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionsIsPosting);
    const postError = useSelector(selectPinOptionsPostError);
    const isDeleting = useSelector(selectPinOptionsIsDeleting);
    const deleteError = useSelector(selectPinOptionsDeleteError);
    const deleteSuccess = useSelector(selectPinOptionsDeleteSuccess);

    const prevProps = usePrevious({ postError });

    const showAddModal = () => {
        dispatch(
            showModal(CREATE_ADMIN_PIN_OPTIONS_VALUE_MODAL, {
                pinOptionTypeID: typeID,
                pinOptionSetID: parseInt(setID),
            }),
        );
    };

    const showEditModal = option => {
        dispatch(showModal(EDIT_ADMIN_PIN_OPTIONS_VALUE_MODAL, { option }));
    };

    const showDeleteModal = option => {
        dispatch(
            showModal(CONFIRM_DELETE, {
                handleDelete: () => dispatch(deletePinOption(option.id)),
                title: `Delete ${option.name}?`,
                message: 'Are you sure you would like to delete this option?',
                isPosting: isDeleting,
                error: deleteError,
            }),
        );
    };

    useEffect(() => {
        if (deleteSuccess && !prevProps.deleteSuccess) {
            dispatch(hideModal());
        }
    });
    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return { showAddModal, showEditModal, showDeleteModal };
};

export default useOptionValueActions;
