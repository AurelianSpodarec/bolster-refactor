import React, { useEffect, useState } from 'react';
import AddLegalDocumentVersion from '../presentational/AddLegalDocumentVersion';
import { useParams } from 'react-router-dom';

const AddLegalDocumentVersionContainer = () => {
    const { id } = useParams();
    useEffect(() => {
        // fetch document, latest version / draft
    }, []);
    const [documentText, setDocText] = useState('');

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

        console.log(postBody);
        // dispatch(updateLegalDocument(postBody));
    };

    const handlePublishDraft = () => handleDraft(true);
    const handleSaveDraft = () => handleDraft();

    return (
        <AddLegalDocumentVersion
            handleSaveDraft={handleSaveDraft}
            handlePublishDraft={handlePublishDraft}
            documentText={documentText}
            setDocText={setDocText}
        />
    );

    function handleSaveDraft() {}
    function handlePublishDraft() {}
};

export default AddLegalDocumentVersionContainer;
