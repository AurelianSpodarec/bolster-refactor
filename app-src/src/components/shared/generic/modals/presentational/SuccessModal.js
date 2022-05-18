import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from '../../button/containers/ButtonContainer';
import ActionButton from '../../button/presentational/ActionButton';

const SuccessModal = ({
    hideModal,
    title = 'Success!',
    message = 'Operation successful',
    link,
    linkMessage,
}) => (
    <ModalOuterContainer>
        <BlockHeading title={title} />
        <p className="generic-text">{message}</p>

        <BlockButtonWrapper>
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

            <ActionButton source="secondary" text="Close" onClick={hideModal} />
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default SuccessModal;
