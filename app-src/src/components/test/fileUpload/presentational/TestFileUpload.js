import React from 'react';
import { FILE_STORAGE_URL } from 'config';

const FileUpload = ({ onChange, onDelete, onCancel, name, value, progress }) => (
    <>
        <input type="file" name={name} onChange={onChange} value="" />
        {progress !== null && (
            <>
                <p>{progress}%</p>
                <button type="button" onClick={onCancel}>
                    Cancel upload
                </button>
            </>
        )}
        {!!value && (
            <>
                <button type="button" onClick={e => onDelete(e, value)}>
                    <i className="far fa-times fa-fw" />
                </button>
                <img
                    style={{ cursor: 'zoom-in' }}
                    alt={value}
                    src={`${FILE_STORAGE_URL}/${value}?width=100`}
                />
            </>
        )}
    </>
);

export default FileUpload;
