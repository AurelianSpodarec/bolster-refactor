import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from '../../button/containers/ButtonContainer';

const SuccessModal = ({
    hideModal,
    title = 'Success!',
    message = 'Operation successful',
    link,
    linkMessage
}) => (
    <ModalOuterContainer>
        <BlockHeading title={title} />
        <BlockButtonWrapper>
            <p className="generic-text">{message}</p>
            <button className="button" onClick={hideModal}>
                <i className="fa fa-times" /> Close
            </button>
            {link && linkMessage && (
                <ButtonContainer to={link}>{linkMessage}</ButtonContainer>
            )}
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default SuccessModal;
