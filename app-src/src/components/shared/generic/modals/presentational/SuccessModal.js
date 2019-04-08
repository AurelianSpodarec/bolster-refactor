import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SuccessModal = ({ hideModal, message = 'Success!' }) => (
    <ModalOuterContainer>
        <BlockHeading title={message} />
        <BlockButtonWrapper>
            <button className="button" onClick={hideModal}>
                <i className="fa fa-times" /> Close
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default SuccessModal;
