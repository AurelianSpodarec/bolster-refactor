import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';

const PinPhotoModal = ({ image }) => (
    <ModalOuterContainer>
        <img alt="pin" src={image} />
    </ModalOuterContainer>
);

export default PinPhotoModal;
