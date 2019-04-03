import React from 'react';

const FileView = ({ file, handleHide }) => {
    return (
        <div>
            {file.endsWith('.pdf') ? (
                <embed src="file" type="application/pdf" />
            ) : (
                <img src="file" />
            )}
            <embed />
        </div>
    );
};

export default FileView;
