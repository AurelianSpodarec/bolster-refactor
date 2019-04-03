import React from 'react';
import { FILE_STORAGE_URL } from 'config';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const FileView = ({ file, handleHide }) => {
    const fileURL = `${FILE_STORAGE_URL}/${file}`;
    return (
        <div>
            {file.endsWith('.pdf') ? (
                <embed src={`${fileURL}?width=500`} type="application/pdf" />
            ) : (
                <img src={`${fileURL}?width=500`} alt="preview of the upload" />
            )}
            <BlockButtonWrapper>
                <button onClick={handleHide} className="button">
                    Upload Different File
                </button>
            </BlockButtonWrapper>
        </div>
    );
};

export default FileView;
