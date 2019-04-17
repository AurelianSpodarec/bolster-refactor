import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const FileUpload = ({
    serverOptions,
    error,
    maxFiles = 1,
    acceptedTypes,
    files,
    handleUpdateFiles,
    handleFileUploadStart,
    handleFileUploadFinish,
    updateRef
}) => (
    <>
        <FilePond
            onupdatefiles={handleUpdateFiles}
            files={files}
            allowFileTypeValidation={!!acceptedTypes}
            acceptedFileTypes={acceptedTypes}
            allowMultiple
            maxFiles={maxFiles}
            server={serverOptions}
            onaddfilestart={file => handleFileUploadStart(file)}
            onprocessfile={file => handleFileUploadFinish(file)}
            ref={updateRef}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default FileUpload;
