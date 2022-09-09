import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_DELETE, USER_NEW_DOCUMENT } from 'constants/shared/modalTypes';
import DocumentsUploader from '../presentational/DocumentsUploader';
import fetchAllUserDocuments from 'actions/companyAdmin/userManagement/async/fetchAllUserDocuments';
import deleteUserDocuments from 'actions/companyAdmin/userManagement/async/deleteUserDocuments';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const DocumentsUploaderContainer = () => {
    const dispatch = useDispatch();
    const documents = useSelector(
        ({ companyAdmin }) => companyAdmin.userDocumentsReducer.userDocuments,
    );
    const isFetching = useSelector(
        ({ companyAdmin }) => companyAdmin.userDocumentsReducer.isFetching,
    );
    const { id: adminId } = useParams();
    const error = useSelector(({ companyAdmin }) => companyAdmin.userDocumentsReducer.error);

    const handleUploadNewDocument = () => {
        dispatch(showModal(USER_NEW_DOCUMENT, { adminId }));
    };

    const handleDelete = id => {
        dispatch(deleteUserDocuments(id));
        dispatch(hideModal());
    };

    const handleDeleteModal = id => {
        dispatch(showModal(CONFIRM_DELETE, { handleDelete: () => handleDelete(id) }));
    };

    useEffect(() => {
        dispatch(fetchAllUserDocuments());
    }, []);

    return (
        <DocumentsUploader
            adminName="Document Manager"
            newButton={handleUploadNewDocument}
            deleteButton={handleDeleteModal}
            documents={Object.values(documents).filter(({ userId, isDeleted }) => {
                return userId === +adminId && !isDeleted;
            })}
            isFetching={isFetching}
            error={error}
        />
    );
};

export default DocumentsUploaderContainer;
