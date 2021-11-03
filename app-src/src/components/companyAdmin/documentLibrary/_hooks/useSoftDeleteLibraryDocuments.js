import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { SOFT_DELETE_LIBRARY_DOCUMENT } from 'constants/shared/modalTypes';
import { getIconFromExt } from 'helpers/general';
import FileTypeIcon from '../FileTypeIcon';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';
import softDeleteLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/softDeleteLibraryDocuments';
import { usePrevious } from 'helpers/hooks';
import { useLocation } from 'react-router-dom';
import searchAllLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/searchAllLibraryDocuments';

const useSoftDeleteLibraryDocuments = (ids = []) => {
    const dispatch = useDispatch();
    const {
        isDeleting,
        deleteSuccess,
        deleteError,
        documentLibrary,
        librarySearchTerm,
        libraryPage,
        libraryPageSize,
    } = useSelector(mapStateToProps);

    const prefixQuery = new URLSearchParams(useLocation().search).get('prefix');

    const prevProps = usePrevious({ deleteSuccess });

    useEffect(() => {
        if (!prevProps.deleteSuccess && deleteSuccess) {
            dispatch(hideModal());
            dispatch(
                searchAllLibraryDocuments(
                    libraryPage,
                    libraryPageSize,
                    librarySearchTerm ? librarySearchTerm : prefixQuery,
                    false,
                ),
            );
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
                                item.type === 200 ? getIconFromExt(item.fileExtension) : FolderIcon
                            }
                            width="18"
                            height="18"
                            style={{ marginRight: '5px' }}
                        />
                        {`${item.name}${item.type === 200 ? '' : ' (folder)'}`}
                    </li>
                ))}
            </ul>
            <br />
            The items will be move to Deleted folder and can be recovered later.
        </>
    );

    const handleShowSoftDeleteModal = () => {
        dispatch(
            showModal(SOFT_DELETE_LIBRARY_DOCUMENT, {
                handleDelete: () => dispatch(softDeleteLibraryDocuments(ids, true)),
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

export default useSoftDeleteLibraryDocuments;
