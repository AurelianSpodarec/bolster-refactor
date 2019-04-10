import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';

const PaymentSuccessModal = ({
    title = 'Order Complete',
    message = 'Your order has been placed successfully.'
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={title} />
            <p>{message}</p>
        </ModalOuterContainer>
    );
};

export default PaymentSuccessModal;
