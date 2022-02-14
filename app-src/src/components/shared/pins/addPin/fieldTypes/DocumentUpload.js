import React from 'react';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const DocumentUpload = ({ isRequired, question: { id }, answers, handleChange }) => {
    return (
        <FileUploadContainer
            name={`answer-${id}`}
            required={isRequired}
            acceptedTypes={['application/pdf']}
            maxFiles={1}
            handleChange={handleChange}
            value={answers[id]}
            displayDocLib
        />
    );
};
export default DocumentUpload;
