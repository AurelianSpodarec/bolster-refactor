import React from 'react';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import { RAW_S3_STORAGE_URL } from 'config';




const MultiPhoto = ({
    isRequired,
    question: { maxPhotos, id },
    answers,
    handleFileChange,
    handleImageClick,
    edit
}) => {
    return edit ? (
        <div>
            {(answers[id] || []).map(src => (
                <img
                    key={src}
                    alt=""
                    src={`${RAW_S3_STORAGE_URL}/${src}`}
                    onClick={() =>
                        handleImageClick({
                            image: `${RAW_S3_STORAGE_URL}/${src}`
                        })
                    }
                />
            ))}
        </div>
    ) : (
        <FileUploadContainer
            name={`answer-${id}`}
            required={isRequired}
            acceptedTypes={['image/*']}
            maxFiles={maxPhotos ? maxPhotos : 25}
            handleChange={handleFileChange}
            value={answers[id]}
        />
    );
};

export default MultiPhoto;