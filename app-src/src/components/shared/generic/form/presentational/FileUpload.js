import React from 'react';
import { FILE_STORAGE_URL } from 'config';

const getFileName = src => {
    return src.match('[^/]*$')[0];
};

const imageTypes = ['gif', 'jpeg', 'jpg', 'png'];

const FileUpload = ({
    onChange,
    onDelete,
    onCancel,
    onAddFileClick,
    name,
    fileS3Keys = [],
    progress,
    inputRef,
    maxFiles
}) => {
    var imageKeys = fileS3Keys.filter(fName =>
        imageTypes.some(type => fName.toLowerCase().endsWith(type))
    );

    var otherKeys = fileS3Keys.filter(
        fName => !imageTypes.some(type => fName.toLowerCase().endsWith(type))
    );

    return (
        <>
            <input
                ref={inputRef}
                style={{ display: 'none' }}
                type="file"
                name={name}
                onChange={onChange}
                multiple={maxFiles > 1}
            />
            <button type="button" onClick={onAddFileClick}>
                Upload
            </button>
            {progress !== null && (
                <>
                    <p>{progress}%</p>
                    <button type="button" onClick={onCancel}>
                        Cancel upload
                    </button>
                </>
            )}
            {otherKeys.map(s3Key => (
                <div key={s3Key}>
                    <button type="button" onClick={e => onDelete(e, s3Key)}>
                        <i className="far fa-times fa-fw" />
                    </button>
                    <p>{getFileName(s3Key)}</p>
                </div>
            ))}
            {imageKeys.map(s3Key => (
                <div key={s3Key}>
                    <button type="button" onClick={e => onDelete(e, s3Key)}>
                        <i className="far fa-times fa-fw" />
                    </button>
                    <img
                        style={{ cursor: 'zoom-in' }}
                        alt={s3Key}
                        src={`${FILE_STORAGE_URL}/${s3Key}?width=100`}
                    />
                </div>
            ))}
        </>
    );
};

export default FileUpload;
