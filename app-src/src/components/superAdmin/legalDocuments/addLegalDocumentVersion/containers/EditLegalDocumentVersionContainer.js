import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import updateLegalDocument from 'actions/superAdmin/legalDocuments/async/updateLegalDocument';
import { usePrevious } from 'helpers/hooks';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { LEGAL_DOCUMENT_TYPE } from 'constants/superAdmin/enums';
import { getKeyByValue } from 'helpers/generic';

import AddLegalDocumentVersion from '../presentational/AddLegalDocumentVersion';

const EditLegalDocumentVersionContainer = ({ data, id }) => {
    const dispatch = useDispatch();
    const { postIsFetching, postSuccess, postError } = useSelector(
        ({ superAdmin: { legalDocumentsReducer } }) => legalDocumentsReducer,
    );
    const [documentText, setDocText] = useState('');
    const [form, setFormChange] = useState({
        docTitle: data.title,
        docType: { text: LEGAL_DOCUMENT_TYPE[10], value: LEGAL_DOCUMENT_TYPE[10] },
    });
    const prevProps = usePrevious({ postIsFetching });

    useEffect(() => {
        setDocText(data.copy);
        handleTypeChange('docType', LEGAL_DOCUMENT_TYPE[data.type]);
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
        setFormChange({
            ...form,
            [name]: value,
        });
    };

    const handleTypeChange = (name, value) => {
        setFormChange({
            ...form,
            [name]: { text: value, value: value },
        });
    };

    const handleDraft = (isPublish = false) => {
        const { docTitle, docType } = form;

        const postBody = {
            IsPublished: isPublish,
            Title: docTitle,
            Copy: documentText,
            Type: Number(getKeyByValue(LEGAL_DOCUMENT_TYPE, docType.value)),
        };

        dispatch(updateLegalDocument(id, postBody));
    };

    const handlePublishDraft = () => handleDraft(true);
    const handleSaveDraft = () => handleDraft();

    return (
        <AddLegalDocumentVersion
            {...form}
            handleSaveDraft={handleSaveDraft}
            handlePublishDraft={handlePublishDraft}
            documentText={documentText}
            setDocText={setDocText}
            handleFormChange={handleFormChange}
            handleTypeChange={handleTypeChange}
        />
    );
};

export default EditLegalDocumentVersionContainer;
