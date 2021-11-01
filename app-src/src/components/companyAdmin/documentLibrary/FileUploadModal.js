import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { RAW_S3_STORAGE_URL } from 'config';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const FileUploadModal = ({
    name = 'urls',
    onChange = () => {},
    maxFiles,
    maxFileSize,
    canDrop,
    isOver,
    progress,
    error,
    handlePress,
    handleRemove,
    dropRef,
    isPosting,
    postError,
    postSuccess,
    showUploadModal,
    setShowUploadModal,
    formData,
    handleHideModal,
}) => {
    const multiple = useMemo(() => maxFiles > 1, [maxFiles]);
    const memoizedOnChange = useCallback(onChange, []);

    useEffect(() => {
        if (multiple) {
            memoizedOnChange(formData.urls);
        } else {
            const [firstItem = ''] = formData.urls;
            memoizedOnChange(firstItem);
        }
    }, [formData.urls, memoizedOnChange, multiple]);

    const isActive = canDrop && isOver;
    const activeClass = isActive ? 'active' : '';
    const uploadingClass = progress ? 'uploading' : '';
    return (
        <ModalOuterContainer>
            <BlockHeading>Upload files</BlockHeading>
            <input
                type="file"
                className="hidden"
                name={name}
                id={name}
                onChange={handlePress}
                multiple={multiple}
            />
            <label
                ref={dropRef}
                htmlFor={name}
                className={`add-card image-upload  ${activeClass} ${uploadingClass}`}
            >
                {formData.urls.length ? renderPreviews() : renderPlaceholder()}
                <span className="progress-bar">
                    <span className="progress" style={{ width: `${progress}%` }} />
                </span>
            </label>
            {!!error && <p className="error-message">{error}</p>}
            <BlockButtonWrapper>
                <button type="submit" className="button green">
                    <i className="fa fa-save" />
                    Upload
                </button>
                <ButtonContainer handleClick={handleHideModal}>Cancel</ButtonContainer>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );

    function renderPreviews() {
        return (
            <div
                className="img-previews"
                style={{ justifyContent: formData.urls.length > 1 ? 'start' : 'center' }}
            >
                {formData.urls.map(s3Key => (
                    <div key={s3Key} className="img-box">
                        <span className="banner">
                            <button type="button" onClick={e => handleRemove(e, s3Key)}>
                                <span className="circle times" />
                            </button>
                        </span>
                        <div
                            className="img"
                            style={{ backgroundImage: `url(${RAW_S3_STORAGE_URL}/${s3Key})` }}
                        />
                    </div>
                ))}
            </div>
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

export default FileUploadModal;

// /documentlibrary/:companyid/
