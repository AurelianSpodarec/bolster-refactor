import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_SUBMIT,
    CREATE_PIN_OPTION_DOCUMENTS_MODAL,
    EDIT_PIN_OPTION_DOCUMENTS_MODAL,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectPinOptionDocumentsPostError,
    selectPinOptionDocumentsPostSuccess,
} from 'selectors/companyAdmin/pinOptionsDocuments';
import deletePinOptionDocument from 'actions/companyAdmin/pinOptionsDocuments/async/deletePinOptionDocument';

const useDocumentsSetActions = optionID => {
    const dispatch = useDispatch();
    const postError = useSelector(selectPinOptionDocumentsPostError);
    const postSuccess = useSelector(selectPinOptionDocumentsPostSuccess);
    const prevProps = usePrevious({ postError, postSuccess });

    const showAddModal = () => {
        dispatch(showModal(CREATE_PIN_OPTION_DOCUMENTS_MODAL, { optionID }));
    };

    const showEditModal = ({ documentsVersion }) => {
        dispatch(showModal(EDIT_PIN_OPTION_DOCUMENTS_MODAL, { documentsVersion }));
    };

    const showDeleteModal = ({ documentsVersion }) => {
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                handleSubmit: () =>
                    dispatch(deletePinOptionDocument(documentsVersion.pinOptionDocumentID)),
                title: `Delete ${documentsVersion.name}?`,
                message: 'Are you sure you would like to delete this document?',
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

export default useDocumentsSetActions;
