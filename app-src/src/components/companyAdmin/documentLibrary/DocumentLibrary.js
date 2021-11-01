import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DocumentFilters from './DocumentFilters';
import DocumentsListTable from './DocumentsListTable';
import DocumentsGrid from './DocumentsGrid';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import useCreateLibraryDocument from './_hooks/useCreateLibraryDocument';
import FileUploadModal from './FileUploadModal';

const DocumentLibrary = () => {
    const [viewMode, setViewMode] = useState('list');
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

    const prefixQuery = new URLSearchParams(useLocation().search).get('prefix');

    const isActive = canDrop && isOver;

    return (
        <>
            <PageHeading title="Document Library" withBackButton>
                <ButtonContainer handleClick={handleShowModal}>Upload File</ButtonContainer>
                <ButtonContainer handleClick={() => {}}>Create Folder</ButtonContainer>
            </PageHeading>

            <BlockContainer>
                <DocumentFilters viewMode={viewMode} setViewMode={setViewMode} />
            </BlockContainer>

            <div ref={dropRef}>
                {viewMode === 'list' ? (
                    <BlockContainer>
                        <DocumentsListTable items={Object.values(dummyData)} />
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

export default DocumentLibrary;

const dummyData = {
    1: {
        id: 1,
        companyID: 51,
        documentLibraryFolderID: null,
        name: 'Dummy Folder 1',
        uploadedBy: 8572,
        uploadDate: new Date().toISOString(),
        isViewApp: true,
        isAttachPins: true,
        isSoftDeleted: false,
        softDeletedByCompanyUserID: null,
        softDeletedOn: null,
        isHardDeleted: false,
        hardDeletedByCompanyUserID: null,
        hardDeletedOn: null,
    },
    2: {
        id: 2,
        companyID: 51,
        documentLibraryFolderID: null,
        name: 'Dummy Folder 2',
        uploadedBy: 8572,
        uploadDate: new Date().toISOString(),
        isViewApp: true,
        isAttachPins: true,
        isSoftDeleted: false,
        softDeletedByCompanyUserID: null,
        softDeletedOn: null,
        isHardDeleted: false,
        hardDeletedByCompanyUserID: null,
        hardDeletedOn: null,
    },
    3: {
        id: 3,
        companyID: 51,
        documentLibraryFolderID: null,
        name: 'Dummy File 1',
        uploadedBy: 8572,
        uploadDate: new Date().toISOString(),
        s3Key: '',
        contentLength: 1000000000,
        MIMEType: 'application/pdf',
        fileExtension: 'pdf',
        isViewApp: true,
        isAttachPins: true,
        isSoftDeleted: false,
        softDeletedByCompanyUserID: null,
        softDeletedOn: null,
        isHardDeleted: false,
        hardDeletedByCompanyUserID: null,
        hardDeletedOn: null,
    },
    4: {
        id: 4,
        companyID: 51,
        documentLibraryFolderID: null,
        name: 'Dummy File 2',
        uploadedBy: 8572,
        uploadDate: new Date().toISOString(),
        s3Key: '',
        contentLength: 1000000000,
        MIMEType: 'application/pdf',
        fileExtension: 'pdf',
        isViewApp: true,
        isAttachPins: true,
        isSoftDeleted: false,
        softDeletedByCompanyUserID: null,
        softDeletedOn: null,
        isHardDeleted: false,
        hardDeletedByCompanyUserID: null,
        hardDeletedOn: null,
    },
};
