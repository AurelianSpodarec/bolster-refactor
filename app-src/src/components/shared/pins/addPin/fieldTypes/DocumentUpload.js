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
        />
    );
};
export default DocumentUpload;
//edit ? (
//     <img
//     alt=""
//     src={`${RAW_S3_STORAGE_URL}/${answers[id]}`}
//     onClick={() =>
//         handleImageClick({
//             image: `${RAW_S3_STORAGE_URL}/${answers[id]}`
//         })
//     }
// />
// ) : (  );
