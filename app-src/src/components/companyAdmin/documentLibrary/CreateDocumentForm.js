import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import React from 'react';

import useCreateDocument from './_hooks/useCreateDocument';

const CreateDocumentForm = ({ initialFiles }) => {
    const {
        handlePress,
        handleRemove,
        handleSubmit,
        handleCancel,
        dropRef,
        isActive,
        progress,
        files,
        error,
        uploading,
        form,
        handleChange,
    } = useCreateDocument(initialFiles);

    const activeClass = isActive ? 'active' : '';
    const uploadingClass = progress ? 'uploading' : '';

    return (
        <div className="add-documents-modal">
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
            <div className="file-upload-options">
                <p>Document Use:</p>
                <div className="checkbox-items">
                    <CheckboxContainer
                        name="isViewApp"
                        checked={form.isViewApp}
                        text="View in app"
                        handleChange={handleChange}
                    />

                    <CheckboxContainer
                        name="isAttachPins"
                        checked={form.isAttachPins}
                        text="Attach to pins"
                        handleChange={handleChange}
                    />
                </div>
                <p>(if none selected, document is only viewable on desktop)</p>
            </div>
            <BlockButtonWrapper>
                <button type="button" className="button green" onClick={handleSubmit}>
                    <i className="fa fa-save" />
                    Upload
                </button>
                <ButtonContainer handleClick={handleCancel}>Cancel</ButtonContainer>
            </BlockButtonWrapper>
        </div>
    );

    function renderPreviews() {
        if (!files || !files.length) return null;

        return (
            <ul className="file-previews">
                {files.map(item => {
                    const { file, uuid, uploaded, errorMessage } = item;

                    let className = '';
                    if (errorMessage) className = 'error';
                    else if (uploaded) className = 'uploaded';

                    return (
                        <li key={uuid}>
                            <div className={`file-item ${className}`}>
                                <p className="main-text">
                                    <strong>{file.name}</strong>{' '}
                                    <span className="meta">
                                        {formatBytes(file.size)} ({file.type})
                                    </span>
                                </p>
                                {uploaded ? (
                                    <i className="fa fa-check" />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={e => {
                                            e.preventDefault();
                                            handleRemove(uuid);
                                        }}
                                    >
                                        <i className="fa fa-times" />
                                    </button>
                                )}
                            </div>
                            {!!errorMessage && (
                                <p className="error-message text-accent-4">{errorMessage}</p>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    }

    function renderPlaceholder() {
        return (
            <>
                <i className="fal fa-image" />
                <h3>
                    Upload a file<span className="contrast-color"> or drag and drop</span>
                </h3>
                <p>PNG, JPG, GIF, up to 5MB</p>
            </>
        );
    }
};

export function formatBytes(bytes) {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    const gb = mb / 1024;

    if (gb > 1) return `${gb.toFixed(2)} gb`;
    if (mb > 1) return `${mb.toFixed(2)} mb`;
    if (kb > 1) return `${kb.toFixed(2)} kb`;

    return `${bytes} bytes`;
}

export default CreateDocumentForm;

// /documentlibrary/:companyid/
