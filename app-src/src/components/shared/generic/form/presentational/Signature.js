import React from 'react';
import SignatureCanvas from 'react-signature-canvas';

const Signature = ({
    penColor,
    error,
    name,
    canvasProps,
    onEnd,
   updateRef
}) => (
    <>
        <SignatureCanvas
            onEnd={onEnd}
            penColor={penColor}
            canvasProps={canvasProps}
            name={name}
            ref={updateRef}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default Signature;
