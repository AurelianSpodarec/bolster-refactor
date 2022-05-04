import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_SUBMIT,
    CREATE_PRELIM_MODAL,
    EDIT_PRELIM_MODAL,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import { selectPrelimPostError, selectPrelimPostSuccess } from 'selectors/companyAdmin/prelims';
import deletePrelim from 'actions/companyAdmin/prelims/async/deletePrelim';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const usePrelimsSetActions = () => {
    const dispatch = useDispatch();
    const postError = useSelector(selectPrelimPostError);
    const postSuccess = useSelector(selectPrelimPostSuccess);
    const prevProps = usePrevious({ postError, postSuccess });

    const showAddModal = () => {
        dispatch(showModal(CREATE_PRELIM_MODAL));
    };

    const showEditModal = set => {
        dispatch(showModal(EDIT_PRELIM_MODAL, { set }));
    };
    const showDeleteModal = set => {
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                handleSubmit: () => dispatch(deletePrelim(set.id)),
                title: `Delete ${set.name}?`,
                message: 'Are you sure you would like to delete this prelim?',
                submitButtonText: 'Delete',
                submitButtonIcon: 'trash-alt',
            }),
        );
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { showAddModal, showEditModal, showDeleteModal };
};

export default usePrelimsSetActions;
