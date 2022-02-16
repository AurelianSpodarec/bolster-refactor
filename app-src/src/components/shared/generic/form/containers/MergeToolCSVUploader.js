import React, { useRef } from 'react';

const MergeToolCSVUploader = ({ handleChange, sourceDrawingID, csvError }) => {
    const inputRef = useRef();

    const handleOnChange = event => {
        handleChange(sourceDrawingID, inputRef.current.files[0], event);
    };

    return (
        <div className="size-lg-12">
            <input type="file" ref={inputRef} onChange={handleOnChange} accept=".csv" />
            {csvError && <p className="error">{csvError}</p>}
        </div>
    );
};

export default MergeToolCSVUploader;
