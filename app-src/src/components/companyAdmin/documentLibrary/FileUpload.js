import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import React from 'react';
import './FileUpload.scss';

import useUploadFiles from './_hooks/useUploadFiles';

const FileUpload = () => {
    const {
        handlePress,
        handleRemove,
        handleSubmit,
        dropRef,
        isActive,
        progress,
        files,
        error,
        uploading,
    } = useUploadFiles();

    const activeClass = isActive ? 'active' : '';
    const uploadingClass = progress ? 'uploading' : '';

    return (
        <>
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
        <BlockButtonWrapper>
                <button type="button" className="button green" onClick={handleSubmit}>
                    <i className="fa fa-save" />
                    Upload
                </button>
                <ButtonContainer handleClick={() => {}}>Cancel</ButtonContainer>
            </BlockButtonWrapper>
        </>
    );

    function renderPreviews() {
        if (!files || !files.length) return null;

        return (
            <ul className="file-previews" >
                {files.map((item) => {
                    const { file, uuid, uploaded, errorMessage } = item;

                    let className = '';
                    if (errorMessage) className = 'error';
                    else if (uploaded) className = 'uploaded';

                    return ( 
                        
                            <li key={uuid}>
                                <div className={`file-item ${className}`}>
                               
                                <p className="main-text"> 
                                    <strong>{escape(file.name)}</strong> ({file.type})
                                    {formatBytes(file.size)}
                                </p>
                                {
                                    uploaded ? (
                                        <i className="fa fa-check" />
                                    ) : (
                                        <button type="button" onClick={e => {
                                            e.preventDefault();
                                            handleRemove(uuid);
                                        }}>
                                            <i className="fa fa-times" />
                                        </button>
                                    )
                                }
                                </div>
                                {!!errorMessage && <p className="error-message text-accent-4">{errorMessage}</p>}
                            </li>
                    );
                })}
            </ul>
        );
    }

    function renderPlaceholder() {
        return (
            <>
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
