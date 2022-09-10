import React from 'react';

import ButtonContainer from '../../button/containers/ButtonContainer';
import ActionButton from '../../button/presentational/ActionButton';
import FlexModalOuter from './FlexModalOuter';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';

const SuccessModal = ({
    hideModal,
    title = 'Success!',
    message = 'Operation successful',
    link,
    linkMessage,
}) => (
    <FlexModalOuter title={title}>
        <div className="flex-content-wrapper">
            <div className="flex-content">
                <p className="generic-text">{message}</p>
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            {link && linkMessage && (
                <ButtonContainer
                    setColour="#2eac58"
                    setColourHoverCode="#258e48"
                    to={link}
                    handleClick={hideModal}
                >
                    {linkMessage}
                </ButtonContainer>
            )}

            <ActionButton text="Close" onClick={hideModal} />
        </ButtonWrapper>
    </FlexModalOuter>
);

export default SuccessModal;
