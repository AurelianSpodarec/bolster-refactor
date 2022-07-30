import React from 'react';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import { RAW_S3_STORAGE_URL } from 'config';

const MultiPhoto = ({
    isRequired,
    question: { maxPhotos, id },
    answers,
    handleChange,
    handleImageClick,
    edit,
}) => {
    const questionValue = answers[id] ?? [];
    return edit ? (
        <div>
            {questionValue.map(({ s3KeyValue: src }) => (
                <img
                    key={src}
                    alt=""
                    src={`${RAW_S3_STORAGE_URL}/${src}`}
                    onClick={() =>
                        handleImageClick({
                            image: `${RAW_S3_STORAGE_URL}/${src}`,
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
            handleChange={handleChange}
            value={(questionValue ?? []).map(({ s3KeyValue }) => s3KeyValue)}
        />
    );
};

export default MultiPhoto;
