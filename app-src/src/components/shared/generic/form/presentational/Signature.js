import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ButtonContainer from '../../button/containers/ButtonContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const Signature = ({
    file,
    penColor,
    error,
    name,
    canvasProps,
    onEnd,
    updateRef,
    showUploadComponent,
    handleClear,
    swtichUploadSig,
    handleUploadChange,
}) => (
    <>
        <div className={`${showUploadComponent ? 'hide' : ''} size-lg-12`}>
            <SignatureCanvas
                onEnd={onEnd}
                penColor={penColor}
                canvasProps={canvasProps}
                name={name}
                ref={updateRef}
            />
        </div>
        <div className={`${showUploadComponent ? '' : 'hide'} size-lg-12`}>
            <FileUploadContainer
                value={file}
                name="file"
                acceptedTypes={['application/pdf', 'image/*']}
                handleChange={handleUploadChange}
            />
        </div>
        {!!(error && error.length) && <p className="error red-text text-accent-4">{error}</p>}
        <div className="button-container under-component">
            {!showUploadComponent && (
                <ButtonContainer
                    setColour="#16a6e2"
                    setColorHoverCode="#1083b3"
                    handleClick={() => swtichUploadSig()}
                >
                    Upload Signature
                </ButtonContainer>
            )}

            {showUploadComponent && (
                <ButtonContainer
                    setColour="#16a6e2"
                    setColorHoverCode="#1083b3"
                    handleClick={() => swtichUploadSig()}
                >
                    Draw Signature
                </ButtonContainer>
            )}
            {!showUploadComponent && (
                <ButtonContainer handleClick={handleClear}>Clear</ButtonContainer>
            )}
        </div>
    </>
);

export default Signature;
