import React from 'react';
import image from '_content/images/examples/pipe.jpg';
import ModalOuterContainer from '../containers/ModalOuterContainer';

const PinPhotoModal = () => (
    <ModalOuterContainer>
        <img alt="pin" src={image} />
    </ModalOuterContainer>
);

export default PinPhotoModal;
