import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DocumentFilters from './DocumentFilters';
import DocumentsListTable from './DocumentsListTable';
import DocumentsGrid from './DocumentsGrid';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import useCreateLibraryDocument from './_hooks/useCreateLibraryDocument';
import useFetchLibraryDocuments from './_hooks/useFetchLibraryDocuments';
import FileUploadModal from './FileUploadModal';
import { useSelector } from 'react-redux';
import switchDocumentLibraryView from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryView';

const DocumentLibrary = () => {
    const { libraryView } = useSelector(mapStateToProps);
    const prefixQuery = new URLSearchParams(useLocation().search).get('prefix');
    const {
        isPosting,
        postError,
        postSuccess,
        showUploadModal,
        setShowUploadModal,
        maxFiles,
        maxFileSize,
        canDrop,
        isOver,
        progress,
        error,
        formattedVal,
        handlePress,
        handleRemove,
        setTimeoutAsync,
        dropRef,
        formData,
        onChange,
        setProgress,
        libCanDrop,
        libIsOver,
        libDropRef,
        handleShowModal,
    } = useCreateLibraryDocument();

    const {
        documentLibrary,
        isFetching,
        fetchError,
        currentPage,
        setCurrentPage,
        setPageSize,
        limit,
        selectedItems,
        toggleItemSelect,
    } = useFetchLibraryDocuments(prefixQuery);

    const isActive = canDrop && isOver;

    return (
        <>
            <PageHeading title="Document Library" withBackButton>
                <ButtonContainer handleClick={handleShowModal}>Upload File</ButtonContainer>
                <ButtonContainer handleClick={() => {}}>Create Folder</ButtonContainer>
            </PageHeading>

            <BlockContainer>
                <DocumentFilters viewMode={libraryView} setViewMode={switchDocumentLibraryView} />
            </BlockContainer>

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
                        <DocumentsGrid items={Object.values(dummyData)} />
                        {isActive && (
                            <div className="dnd-overlay">
                                <h3>Release file to upload</h3>
                            </div>
                        )}
                    </BlockContainer>
                )}
            </div>
            {/* <BlockContainer>
                <FileUploadModal
                    name="urls"
                    isPosting={isPosting}
                    postError={postError}
                    postSuccess={postSuccess}
                    showUploadModal={showUploadModal}
                    setShowUploadModal={setShowUploadModal}
                    maxFiles={maxFiles}
                    maxFileSize={maxFileSize}
                    canDrop={canDrop}
                    isOver={isOver}
                    progress={progress}
                    error={postError}
                    handlePress={handlePress}
                    handleRemove={handleRemove}
                    setTimeoutAsync={setTimeoutAsync}
                    dropRef={dropRef}
                    formData={formData}
                    onChange={onChange}
                    setProgress={setProgress}
                />
            </BlockContainer> */}
        </>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: { libraryView },
    },
}) => ({ libraryView });

export default DocumentLibrary;
