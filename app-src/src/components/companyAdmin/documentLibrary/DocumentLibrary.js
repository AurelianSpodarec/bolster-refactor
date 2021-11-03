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
import useSoftDeleteLibraryDocuments from './_hooks/useSoftDeleteLibraryDocuments';
import useDocumentLibraryPagination from './_hooks/useDocumentsLibraryPagination';
import useOpenCreateDocumentModal from './_hooks/useOpenCreateDocumentModal';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CREATE_LIBRARY_FOLDER } from 'constants/shared/modalTypes';

const DocumentLibrary = () => {
    const dispatch = useDispatch();
    const { libraryView } = useSelector(mapStateToProps);
    const s3KeyQuery = new URLSearchParams(useLocation().search).get('s3key');
    const {
        canDrop,
        isOver,
        dropRef,
        showCreateModal,
    } = useOpenCreateDocumentModal();

    const {
        documentLibrary,
        isFetching,
        fetchError,
        selectedItems,
        toggleItemSelect,
    } = useLibraryDocuments(s3KeyQuery);

    const {
        handleShowSoftDeleteModal,
        handleHideSoftDeleteModal,
        isDeleting,
        deleteSuccess,
        deleteError,
    } = useSoftDeleteLibraryDocuments(selectedItems);

    const { currentPage, setCurrentPage, setPageSize, limit } = useDocumentLibraryPagination();

    const isActive = canDrop && isOver;

    return (
        <>
            <PageHeading title="Document Library" withBackButton>
                <button className="button green" type="button" onClick={showCreateModal}>
                    <i className="fa fa-file-medical" />
                    Upload File
                </button>
                <button className="button blue" type="button" onClick={() => dispatch(showModal(CREATE_LIBRARY_FOLDER))}>
                    <i className="fa fa-folder-plus" />
                    Create Folder
                </button>
            </PageHeading>

            <BlockContainer>
                <DocumentFilters
                    viewMode={libraryView}
                    setViewMode={switchDocumentLibraryView}
                    selectedItems={selectedItems}
                    handleShowSoftDeleteModal={handleShowSoftDeleteModal}
                />
            </BlockContainer>
            {!isFetching ? (
                <>
                    <div ref={dropRef}>
                        {libraryView === 'list' ? (
                            <BlockContainer>
                                <DocumentsListTable
                                    items={Object.values(documentLibrary)}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    limit={limit}
                                    setPageSize={setPageSize}
                                    selectedItems={selectedItems}
                                    toggleItemSelect={toggleItemSelect}
                                />
                                {isActive && (
                                    <div className="dnd-overlay">
                                        <h3>Release file to upload</h3>
                                    </div>
                                )}
                            </BlockContainer>
                        ) : (
                            <BlockContainer contentClass="transparent">
                                <DocumentsGrid
                                    items={Object.values(documentLibrary)}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    limit={limit}
                                    setPageSize={setPageSize}
                                    selectedItems={selectedItems}
                                    toggleItemSelect={toggleItemSelect}
                                />
                                {isActive && (
                                    <div className="dnd-overlay">
                                        <h3>Release file to upload</h3>
                                    </div>
                                )}
                            </BlockContainer>
                        )}
                    </div>
                </>
            ) : (
                <Loading withIcon />
            )}
        </>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: { libraryView },
    },
}) => ({ libraryView });

export default DocumentLibrary;
