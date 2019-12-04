import React from 'react';
import { FILE_STORAGE_URL } from 'config';

const getFileName = src => {
    return src.match('[^/]*$')[0];
};

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
    const { images, other } = organizeS3KeysByType(fileS3Keys);

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
            {other.map(s3Key => (
                <div key={s3Key}>
                    <button type="button" onClick={e => onDelete(e, s3Key)}>
                        <i className="far fa-times fa-fw" />
                    </button>
                    <p>{getFileName(s3Key)}</p>
                </div>
            ))}
            {images.map(s3Key => (
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
const imageTypes = ['gif', 'jpeg', 'jpg', 'png'];

function organizeS3KeysByType(s3KEys) {
    return s3KEys.reduce(
        (acc, s3Key = '') => {
            const fileTypeSuffix = s3Key.slice(s3Key.lastIndexOf('.') + 1).toLowerCase();

            if (imageTypes.includes(fileTypeSuffix)) {
                acc.images.push(s3Key);
            } else {
                acc.other.push(s3Key);
            }

            return acc;
        },
        { images: [], other: [] }
    );
}

export default FileUpload;
