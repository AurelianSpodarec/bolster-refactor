import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import StatusIcon from '../../statusIcon/presentationl/StatusIcon';

const PaymentSuccessModal = ({
    title = 'Order Complete',
    message = 'Your order has been placed successfully.'
}) => (
    <ModalOuterContainer extraClasses="response-modal">
        <div
            className=" size-lg-12"
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
            <StatusIcon classes="large" />
        </div>
        <BlockHeading title={title} />
        <p>{message}</p>
        {/* <BlockButtonWrapper additionalClasses="center-align">
            <button onClick={() => handleClose()} className="button green">
                Confirm
            </button>
        </BlockButtonWrapper> */}
    </ModalOuterContainer>
);

export default PaymentSuccessModal;
