import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';

import withFieldValidation from '../hocs/withFieldValidation';

const Base64Upload = ({ 
    onChange, 
    name, 
    fileName, 
    value, 
    required, 
    showError,
    addFieldError, 
    removeFieldError, 
    allowedFileTypes }) => 
{
    const [validationMessage, setValidationMessage] = useState(null);

    return (
        <>
            <FileBase64 multiple={false} onDone={ handleChange.bind(this) } />
            {!!value && <>
                <img className="base64-image-preview" alt='Uploaded company logo' src={value} />
                <button className='frontend-button gray small base64-image-button' onClick={() => removeFile()}>Remove</button>
            </>}
            
            {validationMessage && <p className="error red-text text-accent-4">{validationMessage}</p>}
        </>
    );

    function handleChange(file) {
        const base64 = file.base64;
        const nameOfFile = file.name;
        const type = file.type;

        if (isFileImage(type)) {
            onChange(name, base64);
            onChange(fileName, nameOfFile);
            handleValidation(null);
        } else {
            onChange(name, '');
            onChange(fileName, '');
            handleValidation('File type not allowed.');
        }
        
        showError();
    }

    function handleValidation(message) {
        if (required) {
            if (message) {
                addFieldError(name, message);
            } else {
                removeFieldError(name);
            }
        } else {
            setValidationMessage(message);
        }
    }

    function isFileImage(type) {
        if (!allowedFileTypes) {
            return true;
        }
     
        return type && allowedFileTypes.includes(type);
    }

    function removeFile() {
        onChange(name, '');
        onChange(fileName, '');

        showError();
    }
};

export default withFieldValidation(Base64Upload);

