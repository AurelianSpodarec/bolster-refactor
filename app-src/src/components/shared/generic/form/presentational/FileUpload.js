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
    uploadingFileName,
    inputRef,
    maxFiles
}) => {
    const { images, other } = organizeS3KeysByType(fileS3Keys);

    return (
        <div className="file-uploader size-lg-12">
            <input
                ref={inputRef}
                style={{ display: 'none' }}
                type="file"
                name={name}
                onChange={onChange}
                multiple={maxFiles > 1}
            />

            {other.map(s3Key => (
                <div className="file-item size-lg-12" key={s3Key}>
                    <p className="file-name">{getFileName(s3Key)}</p>
                    <button
                        type="button"
                        className="button red icon-only delete"
                        onClick={e => onDelete(e, s3Key)}
                    >
                        <i className="far fa-times fa-fw" />
                    </button>
                </div>
            ))}
            {images.map(s3Key => (
                <div className="image-item size-lg-12" key={s3Key}>
                    <p className="file-name">{getFileName(s3Key)}</p>
                    <button
                        type="button"
                        className="button red icon-only delete"
                        onClick={e => onDelete(e, s3Key)}
                    >
                        <i className="far fa-times fa-fw" />
                    </button>
                    <img alt={s3Key} src={`${FILE_STORAGE_URL}/${s3Key}?width=250`} />
                </div>
            ))}

            {progress !== null && (
                <div className="progress size-lg-12">
                    <p className="size-lg-12">
                        {uploadingFileName} <span>{progress}%</span>
                    </p>
                    <button
                        className="button red icon-only delete"
                        type="button"
                        onClick={onCancel}
                    >
                        <i className="far fa-times fa-fw" />
                    </button>
                </div>
            )}
        </div>
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
