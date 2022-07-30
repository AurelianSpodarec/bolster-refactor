import React from 'react';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const DocumentUpload = ({ isRequired, question: { id }, answers, handleChange }) => {
    const [questionValue] = answers[id] ?? [];

    return (
        <FileUploadContainer
            name={`answer-${id}`}
            required={isRequired}
            acceptedTypes={['application/pdf']}
            maxFiles={1}
            handleChange={handleChange}
            value={questionValue?.s3KeyValue}
            displayDocLib
        />
    );
};
export default DocumentUpload;
