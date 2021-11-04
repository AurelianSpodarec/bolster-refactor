import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    SOFT_DELETE_LIBRARY_DOCUMENT,
    HARD_DELETE_LIBRARY_DOCUMENT,
} from 'constants/shared/modalTypes';
import { getIconFromExt } from 'helpers/general';
import FileTypeIcon from '../FileTypeIcon';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import softDeleteLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/softDeleteLibraryDocuments';
import hardDeleteLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/hardDeleteLibraryDocuments';
import { usePrevious } from 'helpers/hooks';
import { useLocation } from 'react-router-dom';
import searchAllLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/searchAllLibraryDocuments';
import { DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';

const useDeleteLibraryDocuments = (ids = []) => {
    const dispatch = useDispatch();
    const {
        isDeleting,
        deleteSuccess,
        deleteError,
        documentLibrary,
        // librarySearchTerm,
        // libraryPage,
        // libraryPageSize,
    } = useSelector(mapStateToProps);

    const prefixQuery = new URLSearchParams(useLocation().search).get('prefix');

    const prevProps = usePrevious({ deleteSuccess, deleteError });

    const areIDsArchived = documentLibrary[ids[0]]
        ? ids.some(id => !!documentLibrary[id].isArchived)
        : false;

    useEffect(() => {
        if (!prevProps.deleteSuccess && deleteSuccess) {
            dispatch(hideModal());
        }
    }, [prevProps.deleteSuccess, deleteSuccess]);

    const filenames = Object.values(documentLibrary).filter(item => ids.includes(item.id));

    const message = () => (
        <>
            Are you sure you want to delete the following library documents? <br />
            <br />
            <ul>
                {filenames.map((item, i) => (
                    <li key={i}>
                        <FileTypeIcon
                            src={
                                item.type === DOCUMENT_LIBRARY_TYPES.FILE
                                    ? getIconFromExt(item.fileExtension)
                                    : FolderIcon
                            }
                            width="18"
                            height="18"
                            style={{ marginRight: '5px' }}
                        />
                        {`${item.name}${
                            item.type === DOCUMENT_LIBRARY_TYPES.FILE ? '' : ' (folder)'
                        }`}
                    </li>
                ))}
            </ul>
            <br />
            {areIDsArchived
                ? 'The items will be permanently deleted and will not be recoverable.'
                : 'The items will be move to Deleted folder and can be recovered later.'}
        </>
    );

    const handleShowDeleteModal = () => {
        if (!areIDsArchived)
            dispatch(
                showModal(SOFT_DELETE_LIBRARY_DOCUMENT, {
                    handleDelete: () => dispatch(softDeleteLibraryDocuments(ids)),
                    handleCancel: () => dispatch(hideModal()),
                    message,
                    error: deleteError,
                }),
            );
        else
            dispatch(
                showModal(HARD_DELETE_LIBRARY_DOCUMENT, {
                    handleDelete: () => dispatch(hardDeleteLibraryDocuments(ids)),
                    handleCancel: () => dispatch(hideModal()),
                    message,
                    error: deleteError,
                }),
            );
    };

    const handleHideDeleteModal = () => {
        dispatch(hideModal());
    };

    return {
        handleShowDeleteModal,
        handleHideDeleteModal,
        isDeleting,
        deleteSuccess,
        deleteError,
    };
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: {
            isDeleting,
            deleteSuccess,
            deleteError,
            documentLibrary,
            librarySearchTerm,
            libraryPage,
            libraryPageSize,
        },
    },
}) => ({
    isDeleting,
    deleteSuccess,
    deleteError,
    documentLibrary,
    librarySearchTerm,
    libraryPage,
    libraryPageSize,
});

export default useDeleteLibraryDocuments;
