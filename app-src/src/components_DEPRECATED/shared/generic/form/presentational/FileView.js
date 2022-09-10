import React from 'react';

import { FILE_STORAGE_URL } from 'config';

const FileView = ({ file, handleHide }) => {
    const fileURL = `${FILE_STORAGE_URL}/${file}`;
    return (
        <div className="file-view size-lg-12">
            {file.endsWith('.pdf') ? (
                <embed src={`${fileURL}?width=500`} type="application/pdf" />
            ) : (
                <img src={`${fileURL}?width=500`} alt="preview of the upload" />
            )}

            <button onClick={handleHide} className="button">
                Upload New File
            </button>
        </div>
    );
};

export default FileView;
