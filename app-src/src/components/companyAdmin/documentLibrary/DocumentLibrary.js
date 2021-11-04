import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DocumentFilters from './DocumentFilters';
import DocumentsListTable from './DocumentsListTable';
import DocumentsGrid from './DocumentsGrid';
import useLibraryDocuments from './_hooks/useLibraryDocuments';
import { useSelector } from 'react-redux';
import switchDocumentLibraryView from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryView';
import useDeleteLibraryDocuments from './_hooks/useDeleteLibraryDocuments';
import useDocumentLibraryPagination from './_hooks/useDocumentsLibraryPagination';
import useOpenCreateDocumentModal from './_hooks/useOpenCreateDocumentModal';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CREATE_LIBRARY_FOLDER, EDIT_LIBRARY_ITEMS } from 'constants/shared/modalTypes';
import useRestoreLibraryDocuments from './_hooks/useRestoreLibraryDocuments';

import useWindowScroll from 'helpers/hooks/useWindowScroll';

const DocumentLibrary = () => {
    const dispatch = useDispatch();
    const { libraryView } = useSelector(mapStateToProps);
    const prefixQuery = new URLSearchParams(useLocation().search).get('prefix');
    const { canDrop, isOver, dropRef, showCreateModal } = useOpenCreateDocumentModal();

    const {
        documentLibrary,
        isFetching,
        fetchError,
        selectedItems,
        toggleItemSelect,
    } = useLibraryDocuments(prefixQuery);

    const {
        handleShowDeleteModal,
        handleHideDeleteModal,
        isDeleting,
        deleteSuccess,
        deleteError,
    } = useDeleteLibraryDocuments(selectedItems);

    const {
        handleShowRestoreModal,
        handleHideRestoreModal,
        isRestoring,
        restoreSuccess,
        restoreError,
    } = useRestoreLibraryDocuments(selectedItems);

    const { currentPage, setCurrentPage, setPageSize, limit } = useDocumentLibraryPagination();

    const isActive = canDrop && isOver;

    const showEditModal = () => {
        dispatch(showModal(EDIT_LIBRARY_ITEMS, { ids: selectedItems }));
    };

    const scroll = useWindowScroll();

    return (
        <>
            <PageHeading title="Document Library" withBackButton>
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
                />
            </BlockContainer>
            <div ref={dropRef} className="table-wrapper">
                {libraryView === 'list' ? (
                    <>
                        <DocumentsListTable
                            items={Object.values(documentLibrary)}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            limit={limit}
                            setPageSize={setPageSize}
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
                            items={Object.values(documentLibrary)}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            limit={limit}
                            setPageSize={setPageSize}
                            selectedItems={selectedItems}
                            toggleItemSelect={toggleItemSelect}
                            prefixQuery={prefixQuery}
                            isFetching={isFetching}
                            fetchError={fetchError}
                        />
                        {isActive && (
                            <div className="dnd-overlay">
                                <h3>Release file to upload</h3>
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
        documentLibraryReducer: { libraryView },
    },
}) => ({ libraryView });

export default DocumentLibrary;
