import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_DELETE,
    CREATE_PIN_OPTIONS_SET_MODAL,
    DUPLICATE_PIN_OPTIONS_SET_MODAL,
    EDIT_PIN_OPTIONS_SET_MODAL,
    ERROR_MODAL,
    MERGE_PIN_OPTION_SETS_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import setOptionSetAsDefault from 'actions/companyAdmin/pinOptions/async/setOptionSetAsDefault';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import enablePinOptionSet from 'actions/companyAdmin/pinOptions/async/enablePinOptionSet';
import disablePinOptionSet from 'actions/companyAdmin/pinOptions/async/disablePinOptionSet';
import {
    selectPinOptionSetsDeleteSuccess,
    selectPinOptionSetsDuplicateSuccess,
    selectPinOptionSetsIsPosting,
    selectPinOptionSetsPostError,
} from 'selectors/companyAdmin/pinOptionSets';
import deletePinOptionSet from 'actions/companyAdmin/pinOptions/async/deletePinOptionSet';
import unsetOptionSetAsDefault from '../../../../../actions/companyAdmin/pinOptions/async/unsetOptionSetAsDefault';

const useOptionSetActions = selectedTypeID => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectPinOptionSetsIsPosting);
    const postError = useSelector(selectPinOptionSetsPostError);
    const deleteSuccess = useSelector(selectPinOptionSetsDeleteSuccess);
    const duplicateSuccess = useSelector(selectPinOptionSetsDuplicateSuccess);

    const prevProps = usePrevious({ postError, deleteSuccess, duplicateSuccess });

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
            showModal(CONFIRM_DELETE, {
                handleDelete: () => dispatch(deletePinOptionSet(set.id)),
                title: `Delete ${set.name}?`,
                message: 'Are you sure you would like to delete this set?',
            }),
        );
    };

    const showDuplicateModal = set => {
        dispatch(showModal(DUPLICATE_PIN_OPTIONS_SET_MODAL, { set }));
    };

    const showMergeModal = set => {
        dispatch(showModal(MERGE_PIN_OPTION_SETS_MODAL, { set }));
    };

    const enableOptionSet = set => {
        if (!isPosting) dispatch(enablePinOptionSet(set));
    };

    const disableOptionSet = set => {
        if (!isPosting) dispatch(disablePinOptionSet(set));
    };

    const setAsDefault = set => {
        if (!isPosting) dispatch(setOptionSetAsDefault(set));
    };

    const removeAsDefault = set => {
        if (!isPosting) dispatch(unsetOptionSetAsDefault(set));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (deleteSuccess && !prevProps.deleteSuccess) dispatch(hideModal());
    }, [deleteSuccess, prevProps.deleteSuccess]);

    useEffect(() => {
        if (duplicateSuccess && !prevProps.duplicateSuccess) dispatch(hideModal());
    }, [duplicateSuccess, prevProps.duplicateSuccess]);

    return {
        showAddModal,
        showEditModal,
        showDeleteModal,
        showDuplicateModal,
        showMergeModal,
        enableOptionSet,
        disableOptionSet,
        setAsDefault,
        removeAsDefault,
    };
};

export default useOptionSetActions;
