import React from 'react';
import ReactDOM from 'react-dom';
import SignatureCanvas from 'react-signature-canvas';

const Signature = ({
    penColor,
    error,
    name,
    canvasProps,
    onEnd,
    sigPad
}) => (
    <>
        <SignatureCanvas
            onEnd={onEnd}
            penColor={penColor}
            canvasProps={canvasProps}
            name={name}
            ref={(ref) => {
                console.log(ref);
                this.sigPad = ref;
            }}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default Signature;
