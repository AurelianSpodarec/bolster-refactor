import React from 'react';
import ButtonContainer from '../../button/containers/ButtonContainer';

const BackButton = ({ handleClick }) => (
    <ButtonContainer className="button back" handleClick={handleClick}>
        <i className="fa fa-chevron-double-left" /> Back
    </ButtonContainer>
);

export default BackButton;
