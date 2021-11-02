import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { SOFT_DELETE_LIBRARY_DOCUMENT } from 'constants/shared/modalTypes';
import { getIconFromExt } from 'helpers/general';
import FileTypeIcon from '../FileTypeIcon';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';

const useSoftDeleteLibraryDocuments = (ids = []) => {
    const dispatch = useDispatch();
    const { isDeleting, deleteSuccess, deleteError, documentLibrary } = useSelector(
        mapStateToProps,
    );

    const filenames = ids.map(id => ({
        name: documentLibrary[id].name,
        fileExtension: documentLibrary[id].fileExtension,
    }));

    const message = () => (
        <>
            Are you sure you want to delete the following library documents? <br />
            <br />
            <ul>
                {filenames.map((item, i) => (
                    <li key={i}>
                        <FileTypeIcon
                            src={
                                item.fileExtension ? getIconFromExt(item.fileExtension) : FolderIcon
                            }
                            width="18"
                            height="18"
                            style={{ marginRight: '5px' }}
                        />
                        {`${item.name}${
                            item.fileExtension ? `.${item.fileExtension}` : ' (folder)'
                        }`}
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
