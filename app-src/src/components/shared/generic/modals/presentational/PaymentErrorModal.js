import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const PaymentErrorModal = ({
    title = 'Payment Failed',
    message = 'Something went wrong while trying to take your payment, please try again',
    resubmit,
    hideModal
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={title} />
            <p>{message}</p>
            <BlockButtonWrapper>
                <button className="button" onClick={hideModal}>
                    Cancel
                </button>
                <button className="button" onClick={resubmit}>
                    Try again
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default PaymentErrorModal;
