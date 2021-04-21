import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_DELETE, USER_NEW_DOCUMENT } from 'constants/shared/modalTypes';
import DocumentsUploader from '../presentational/DocumentsUploader';
import fetchAllUserDocuments from 'actions/companyAdmin/userManagement/async/fetchAllUserDocuments';
import deleteUserDocuments from 'actions/companyAdmin/userManagement/async/deleteUserDocuments';

const DocumentsUploaderContainer = () => {
    const dispatch = useDispatch();
    const documents = useSelector(
        ({ companyAdmin }) => companyAdmin.userDocumentsReducer.userDocuments,
    );
    const isFetching = useSelector(
        ({ companyAdmin }) => companyAdmin.userDocumentsReducer.isFetching,
    );
    const error = useSelector(({ companyAdmin }) => companyAdmin.userDocumentsReducer.error);
    const location = useLocation();
    const isOperative = location.pathname.includes('operative');

    const handleUploadNewDocument = () => {
        dispatch(showModal(USER_NEW_DOCUMENT));
    };

    const handleDelete = id => {
        dispatch(deleteUserDocuments(id));
    };

    const handleDeleteModal = id => {
        dispatch(showModal(CONFIRM_DELETE, { handleDelete: handleDelete(id) }));
    };

    useEffect(() => {
        dispatch(fetchAllUserDocuments());
    }, []);

    return (
        <DocumentsUploader
            adminName="Document Manager"
            newButton={handleUploadNewDocument}
            deleteButton={handleDeleteModal}
            documents={Object.values(documents)}
            isFetching={isFetching}
            error={error}
        />
    );
};

export default DocumentsUploaderContainer;
