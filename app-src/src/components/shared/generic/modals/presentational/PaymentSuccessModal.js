import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';

const PaymentSuccessModal = ({
    title = 'Order Complete',
    message = 'Your order has been placed successfully.'
}) => (
    <ModalOuterContainer>
        <div
            className="size-lg-12"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center'
            }}
        >
            <i
                className="fa fa-check"
                style={{
                    borderRadius: '100%',
                    backgroundColor: 'green',
                    color: 'white',
                    fontSize: '3em',
                    padding: '0.5em'
                }}
            />
        </div>
        <BlockHeading title={title} />
        <p>{message}</p>
    </ModalOuterContainer>
);

export default PaymentSuccessModal;
