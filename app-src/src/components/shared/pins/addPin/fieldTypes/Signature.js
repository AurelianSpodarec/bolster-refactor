import React from 'react';
import SignatureContainer from 'components/shared/generic/form/containers/SignatureContainer';


const Signature = ({ isRequired, question: { id }, handleSignatureChange }) => {
    return (
        <SignatureContainer
            name={`answer-${id}`}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
            required={isRequired}
            onChange={handleSignatureChange}
        />
    );
};

export default Signature;