import React from 'react';
import './FileUpload.scss';

import useUploadFiles from './_hooks/useUploadFiles';

const FileUpload = () => {
    const {
        handlePress,
        dropRef,
        isActive,
        progress,
        files,
        error,
    } = useUploadFiles();

    console.log('error', error);
    const activeClass = isActive ? 'active' : '';
    const uploadingClass = progress ? 'uploading' : '';
    return (
        <div className="file-upload-container">
            <input
                type="file"
                className="hidden"
                name="file-upload"
                id="file-upload"
                onChange={handlePress}
                multiple
            />
            <label
                ref={dropRef}
                htmlFor="file-upload"
                className={`add-card image-upload  ${activeClass} ${uploadingClass}`}
            >
                {renderPlaceholder()}
                <span className="progress-bar">
                    <span className="progress" style={{ width: `${progress}%` }} />
                </span>
            </label>
            {!!error && <p className="error-message text-accent-4">{error}</p>}
            {renderPreviews()}
        </div>
    );

    function renderPreviews() {
        if (!files || !files.length) return null;

        return (
            <ul className="img-previews" >
                {files.map((file, i) => 
                    <li key={file.name + i}>
                        <strong>{escape(file.name)}</strong> ({file.type})
                        {formatBytes(file.size)}
                    </li>)}
            </ul>
        );
    }

    function renderPlaceholder() {
        return (
            <>
                {/* {progress ? <LoadingIcon /> : <FileUploadIcon />} */}
                <span className="text">
                    {isActive ? 'Release to drop' : 'Drag files here or click'}
                </span>
            </>
        );
    }
};

function formatBytes(bytes) {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    const gb  = mb / 1024;

    if (gb > 1) return `${gb.toFixed(2)} gb`;
    if (mb > 1) return `${mb.toFixed(2)} mb`;
    if (kb > 1) return `${kb.toFixed(2)} kb`;
    
    return  `${bytes} bytes`;
}

export default FileUpload;

// /documentlibrary/:companyid/
