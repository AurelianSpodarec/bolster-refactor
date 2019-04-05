import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeadingWControls from '../../blockHeadingWControls/presentational/BlockHeadingWControls';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const SuccessModal = ({ hideModal, message = 'Success!' }) => (
    <ModalOuterContainer>
        <BlockHeadingWControls title={message} />
        <BlockButtonWrapper>
            <button className="button" onClick={hideModal}>
                <i className="fa fa-times" /> Close
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default SuccessModal;
