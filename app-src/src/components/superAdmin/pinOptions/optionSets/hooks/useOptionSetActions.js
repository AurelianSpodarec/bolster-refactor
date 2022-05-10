import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_DELETE,
    CREATE_ADMIN_PIN_OPTIONS_SET_MODAL,
    EDIT_ADMIN_PIN_OPTIONS_SET_MODAL,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import {
    selectPinOptionSetsDeleteError,
    selectPinOptionSetsDeleteSuccess,
    selectPinOptionSetsIsDeleting,
    selectPinOptionSetsPostError,
} from '../../../../../selectors/superAdmin/pinOptionSets';
import deletePinOptionSet from '../../../../../actions/superAdmin/pinOptions/async/deletePinOptionSet';

const useOptionSetActions = selectedTypeID => {
    const dispatch = useDispatch();
    const postError = useSelector(selectPinOptionSetsPostError);
    const isDeleting = useSelector(selectPinOptionSetsIsDeleting);
    const deleteError = useSelector(selectPinOptionSetsDeleteError);
    const deleteSuccess = useSelector(selectPinOptionSetsDeleteSuccess);

    const prevProps = usePrevious({ postError, deleteSuccess });

    console.log(deleteSuccess, prevProps.deleteSuccess);
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
            showModal(CONFIRM_DELETE, {
                handleDelete: () => dispatch(deletePinOptionSet(set.id)),
                title: `Delete ${set.name}?`,
                message: 'Are you sure you would like to delete this set?',
                isPosting: isDeleting,
                error: deleteError,
            }),
        );
    };

    useEffect(() => {
        if (deleteSuccess && !prevProps.deleteSuccess) {
            dispatch(hideModal());
        }
    }, [deleteSuccess]);

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
