import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

registerPlugin(FilePondPluginImagePreview);

const FileUpload = ({
    addRef,
    handleBeforeAddFile,
    handleAddFile,
    handleRemoveFile,
    error
}) => (
    <div>
        <FilePond
            ref={addRef}
            onaddfile={handleAddFile}
            onremovefile={handleRemoveFile}
            beforeAddFile={handleBeforeAddFile}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </div>
);

export default FileUpload;
