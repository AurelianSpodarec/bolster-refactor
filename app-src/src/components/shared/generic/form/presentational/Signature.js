import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ButtonContainer from '../../button/containers/ButtonContainer';

const Signature = ({ penColor, error, name, canvasProps, onEnd, updateRef, handleClear }) => (
    <>
        <SignatureCanvas
            onEnd={onEnd}
            penColor={penColor}
            canvasProps={canvasProps}
            name={name}
            ref={updateRef}
        />
        {!!(error && error.length) && <p className="error red-text text-accent-4">{error}</p>}
        <ButtonContainer setColour="#16a6e2" setColorHoverCode="#1083b3" handleClick={handleClear}>
            Upload Signature
        </ButtonContainer>
        <ButtonContainer handleClick={handleClear}>Clear</ButtonContainer>
    </>
);

export default Signature;
