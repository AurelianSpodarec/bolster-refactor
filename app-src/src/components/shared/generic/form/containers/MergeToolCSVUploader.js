import React, { useRef } from 'react';

const MergeToolCSVUploader = ({ handleChange, sourceDrawingID }) => {
    const inputRef = useRef();

    const handleOnChange = event => {
        handleChange(sourceDrawingID, inputRef.current.files[0]);
        event.target.value = null;
    };

    return (
        <div className="size-lg-12">
            <input type="file" ref={inputRef} onChange={handleOnChange} accept=".csv" />
        </div>
    );
};

export default MergeToolCSVUploader;
