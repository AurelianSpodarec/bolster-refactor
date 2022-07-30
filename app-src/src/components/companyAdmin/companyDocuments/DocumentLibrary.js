import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DocumentFilters from './DocumentFilters';
import DocumentsListTable from './DocumentsListTable';
import DocumentsGrid from './DocumentsGrid';
import useLibraryDocuments from './_hooks/useLibraryDocuments';
import { useSelector } from 'react-redux';
import switchDocumentLibraryView from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryView';
import useDeleteLibraryDocuments from './_hooks/useDeleteLibraryDocuments';
import useOpenCreateDocumentModal from './_hooks/useOpenCreateDocumentModal';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CREATE_LIBRARY_FOLDER, EDIT_LIBRARY_ITEMS } from 'constants/shared/modalTypes';
import useRestoreLibraryDocuments from './_hooks/useRestoreLibraryDocuments';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import { usePrevious } from 'helpers/hooks';

import useWindowScroll from 'helpers/hooks/useWindowScroll';

const DocumentLibrary = () => {
    const dispatch = useDispatch();
    const { libraryView, libraryFilter, id } = useSelector(mapStateToProps);
    const prefixQuery = new URLSearchParams(useLocation().search).get('prefix');
    const { canDrop, isOver, dropRef, showCreateModal } = useOpenCreateDocumentModal();
    const history = useHistory();
    const prevProps = usePrevious({ libraryFilter });

    const {
        documentLibrary,
        isFetching,
        fetchError,
        selectedItems,
        setSelectedItems,
        toggleItemSelect,
        isRoot,
    } = useLibraryDocuments(prefixQuery);

    const { handleShowDeleteModal } = useDeleteLibraryDocuments(selectedItems, setSelectedItems);

    const { handleShowRestoreModal } = useRestoreLibraryDocuments(selectedItems, setSelectedItems);

    useEffect(() => {
        dispatch(fetchCompanyUsers(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (
            (libraryFilter === 'isArchived' && prevProps.libraryFilter !== 'isArchived') ||
            (libraryFilter !== 'isArchived' && prevProps.libraryFilter === 'isArchived')
        )
            history.replace('/company/company-documents');
    }, [libraryFilter, prevProps.libraryFilter]); // Redirect to root when switching to/from deleted

    const isActive = canDrop && isOver;

    const showEditModal = () => {
        dispatch(showModal(EDIT_LIBRARY_ITEMS, { ids: selectedItems }));
    };

    const scroll = useWindowScroll();

    return (
        <>
            <PageHeading title="Company Documents">
                <button className="button green" type="button" onClick={() => showCreateModal()}>
                    <i className="fa fa-file-medical" />
                    Upload File
                </button>
                <button
                    className="button blue"
                    type="button"
                    onClick={() => dispatch(showModal(CREATE_LIBRARY_FOLDER))}
                >
                    <i className="fa fa-folder-plus" />
                    Create Folder
                </button>
            </PageHeading>

            <BlockContainer>
                <DocumentFilters
                    viewMode={libraryView}
                    setViewMode={switchDocumentLibraryView}
                    selectedItems={selectedItems}
                    showEditModal={showEditModal}
                    handleShowDeleteModal={handleShowDeleteModal}
                    handleShowRestoreModal={handleShowRestoreModal}
                    isRoot={isRoot}
                />
            </BlockContainer>
            <div ref={dropRef} className={`table-wrapper ${libraryView}`}>
                {libraryView === 'list' ? (
                    <>
                        <DocumentsListTable
                            items={documentLibrary}
                            selectedItems={selectedItems}
                            toggleItemSelect={toggleItemSelect}
                            prefixQuery={prefixQuery}
                            isFetching={isFetching}
                            fetchError={fetchError}
                        />
                        {isActive && (
                            <div className="dnd-overlay">
                                <div
                                    className="dnd-indicator"
                                    style={{ top: scroll.y + window.innerHeight / 3 }}
                                >
                                    <h3>Drag and Drop</h3>
                                    <p>Release to upload</p>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <DocumentsGrid
                            items={documentLibrary}
                            selectedItems={selectedItems}
                            toggleItemSelect={toggleItemSelect}
                            prefixQuery={prefixQuery}
                            isFetching={isFetching}
                            fetchError={fetchError}
                        />
                        {isActive && (
                            <div className="dnd-overlay">
                                <div
                                    className="dnd-indicator"
                                    style={{ top: scroll.y + window.innerHeight / 3 }}
                                >
                                    <h3>Drag and Drop</h3>
                                    <p>Release to upload</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: { libraryView, libraryFilter },
        companySettingsReducer: {
            companySettings: { id },
        },
    },
}) => ({ libraryView, id, libraryFilter });

export default DocumentLibrary;
