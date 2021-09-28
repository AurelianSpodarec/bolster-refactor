import React, { useRef } from 'react';

const MergeToolCSVUploader = ({ handleChange, sourceDrawingID }) => {
    const inputRef = useRef();

    const handleOnChange = () => {
        handleChange(sourceDrawingID, inputRef.current.files[0]);
    };

    return (
        <div className="size-lg-12">
            <input type="file" ref={inputRef} onChange={handleOnChange} accept=".csv" />
            {/* <button className="button">Get Selected Pins</button> */}
        </div>
    );
};

export default MergeToolCSVUploader;
