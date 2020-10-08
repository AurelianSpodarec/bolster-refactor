import React from 'react';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const TrustedBy = () => {
    return (
        <div className="trusted-by-settings-container">
            <div className="trusted-by-grid">
                {Array(5)
                    .fill(0)
                    .map((item, index) => (
                        <div key={index} className="trusted-by-grid-item-container">
                            <div className="trusted-by-grid-item">
                                <FileUploadContainer
                                    name={`fileS3Key${index}`}
                                    acceptedTypes={['image/*']}
                                    required
                                />
                            </div>
                            <TextInputContainer />
                            <ButtonContainer>Save</ButtonContainer>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TrustedBy;
