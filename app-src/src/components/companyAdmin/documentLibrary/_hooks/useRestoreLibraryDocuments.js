import React from 'react';
import restoreLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/restoreLibraryDocuments';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/showModal';
import { DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';
import { useDispatch, useSelector } from 'react-redux';
import FileTypeIcon from '../FileTypeIcon';
import { RESTORE_LIBRARY_DOCUMENTS } from 'constants/shared/modalTypes';
import { getIconFromExt } from 'helpers/general';
import FolderIcon from '_content/images/icons/dl-folder-icon.svg';

const useRestoreLibraryDocuments = (ids = []) => {
    const dispatch = useDispatch();
    const {
        documentLibrary,
        librarySearchTerm,
        libraryPage,
        libraryPageSize,
        isRestoring,
        restoreSuccess,
        restoreError,
    } = useSelector(mapStateToProps);

    const filenames = Object.values(documentLibrary).filter(item => ids.includes(item.id));

    const message = () => (
        <>
            Are you sure you want to restore the following library documents? <br />
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
            {'The items will be restored'}
        </>
    );

    const handleShowRestoreModal = () => {
        dispatch(
            showModal(RESTORE_LIBRARY_DOCUMENTS, {
                handleDelete: () => dispatch(restoreLibraryDocuments(ids)),
                handleCancel: () => dispatch(hideModal()),
                message,
                error: restoreError,
            }),
        );
    };

    const handleHideRestoreModal = () => {
        dispatch(hideModal());
    };

    return {
        handleShowRestoreModal,
        handleHideRestoreModal,
        isRestoring,
        restoreSuccess,
        restoreError,
    };
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: {
            isRestoring,
            restoreSuccess,
            restoreError,
            documentLibrary,
            librarySearchTerm,
            libraryPage,
            libraryPageSize,
        },
    },
}) => ({
    documentLibrary,
    librarySearchTerm,
    libraryPage,
    libraryPageSize,
    isRestoring,
    restoreSuccess,
    restoreError,
});

export default useRestoreLibraryDocuments;
