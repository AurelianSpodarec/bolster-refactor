import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';

import postLegalDocument from 'actions/superAdmin/legalDocuments/async/postLegalDocument';
import { usePrevious } from 'helpers/hooks';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { LEGAL_DOCUMENT_TYPE } from 'constants/superAdmin/enums';
import { getKeyByValue } from 'helpers/generic';

import CreateLegalDocument from '../presentational/CreateLegalDocument';

const CreateLegalDocumentContainer = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { postIsFetching, postSuccess, postError } = useSelector(
        ({ superAdmin: { legalDocumentsReducer } }) => legalDocumentsReducer,
    );
    const [documentText, setDocText] = useState('');
    const [form, setFormChange] = useState({
        docTitle: 'Document Name',
        docType: { text: LEGAL_DOCUMENT_TYPE[10], value: LEGAL_DOCUMENT_TYPE[10] },
    });
    const prevProps = usePrevious({ postIsFetching });

    useEffect(() => {
        if (get(location, ['state', 'type']))
            handleFormChange('docType', LEGAL_DOCUMENT_TYPE[get(location, ['state', 'type'])]);
    }, []);

    useEffect(() => {
        if (prevProps.postIsFetching && !postIsFetching && postSuccess) {
            dispatch(
                showModal(SUCCESS_MODAL, {
                    hideModal,
                    message: 'Success',
                    link: '/admin/legal-documents',
                    linkMessage: 'Go back to Legal Document',
                }),
            );
        }

        if (prevProps.postIsFetching && !postIsFetching && postError) {
            dispatch(
                showModal(ERROR_MODAL, {
                    hideModal,
                    message: 'An error occurred.',
                }),
            );
        }
        //eslint-disable-next-line
    }, [postIsFetching]);

    const handleFormChange = (name, value) => {
        if (name === 'docType') {
            setFormChange({
                ...form,
                [name]: { text: value, value: value },
            });
        } else {
            setFormChange({
                ...form,
                [name]: value,
            });
        }
    };

    const handleDraft = (isPublish = false) => {
        const { docTitle, docType } = form;

        const postBody = {
            IsPublished: isPublish,
            Title: docTitle,
            Copy: documentText,
            Type: Number(getKeyByValue(LEGAL_DOCUMENT_TYPE, docType.value)),
        };

        dispatch(postLegalDocument(postBody));
    };

    const handlePublishDraft = () => handleDraft(true);
    const handleSaveDraft = () => handleDraft();

    return (
        <CreateLegalDocument
            {...form}
            handleSaveDraft={handleSaveDraft}
            handlePublishDraft={handlePublishDraft}
            documentText={documentText}
            setDocText={setDocText}
            handleFormChange={handleFormChange}
        />
    );
};

export default CreateLegalDocumentContainer;
