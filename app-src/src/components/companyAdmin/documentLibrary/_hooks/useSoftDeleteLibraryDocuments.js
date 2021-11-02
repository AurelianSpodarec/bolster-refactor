import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { SOFT_DELETE_LIBRARY_DOCUMENT } from 'constants/shared/modalTypes';
import { dummyData as documentLibrary } from './useLibraryDocuments';

const useSoftDeleteLibraryDocuments = (ids = []) => {
    const dispatch = useDispatch();
    const { isDeleting, deleteSuccess, deleteError } = useSelector(mapStateToProps);

    const filenames = ids
        .map(id =>
            documentLibrary[id].name
                ? `${documentLibrary[id].name}${
                      documentLibrary[id].fileExtension
                          ? `.${documentLibrary[id].fileExtension}`
                          : ' (folder)'
                  }`
                : null,
        )
        .filter(name => !!name);

    const message = () => (
        <>
            Are you sure you want to delete the following library documents? <br />
            <br />
            <ul>
                {filenames.map((name, i) => (
                    <li key={i}>{name}</li>
                ))}
            </ul>
            <br />
            The items will be move to Deleted folder and can be recovered later.
        </>
    );

    const handleShowSoftDeleteModal = () => {
        dispatch(
            showModal(SOFT_DELETE_LIBRARY_DOCUMENT, {
                handleDelete: () => console.log('Delete'),
                handleCancel: () => dispatch(hideModal()),
                message,
            }),
        );
    };
    const handleHideSoftDeleteModal = () => {
        dispatch(hideModal());
    };

    return {
        handleShowSoftDeleteModal,
        handleHideSoftDeleteModal,
        isDeleting,
        deleteSuccess,
        deleteError,
    };
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: { isDeleting, deleteSuccess, deleteError, documentLibrary },
    },
}) => ({ isDeleting, deleteSuccess, deleteError, documentLibrary });

export default useSoftDeleteLibraryDocuments;
