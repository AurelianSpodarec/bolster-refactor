import React from 'react';
import ButtonContainer from '../../button/containers/ButtonContainer';

const BackButton = ({ handleClick, classes = '' }) => (
    <ButtonContainer
        className={`button back ${classes}`}
        handleClick={handleClick}
    >
        <i className="fa fa-chevron-double-left" /> Back
    </ButtonContainer>
);

export default BackButton;
