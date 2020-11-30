import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import postLegalDocument from 'actions/superAdmin/legalDocuments/async/postLegalDocument';
import { usePrevious } from 'helpers/hooks';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { LEGAL_DOCUMENT_TYPE } from 'constants/superAdmin/enums';
import { getKeyByValue } from 'helpers/generic';

import AddLegalDocumentVersion from '../presentational/AddLegalDocumentVersion';
import { useParams } from 'react-router-dom';

const AddLegalDocumentVersionContainer = ({ data }) => {
    const history = useHistory();
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

        dispatch(postLegalDocument(postBody));
    };

    const handleBack = () => history.push('/admin/legal-documents');
    const handlePublishDraft = () => handleDraft(true);
    const handleSaveDraft = () => handleDraft();

    return (
        <AddLegalDocumentVersion
            handleSaveDraft={handleSaveDraft}
            handlePublishDraft={handlePublishDraft}
            handleBack={handleBack}
            documentText={documentText}
            setDocText={setDocText}
        />
    );

    function handleSaveDraft() {}
    function handlePublishDraft() {}
};

export default AddLegalDocumentVersionContainer;
