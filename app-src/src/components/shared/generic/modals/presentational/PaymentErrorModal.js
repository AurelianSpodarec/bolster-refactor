import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const PaymentErrorModal = ({
    title = 'Payment Failed',
    message = 'Something went wrong while trying to take your payment, please try again',
    resubmit,
    hideModal,
    disbaledButton,
    error
}) => (
    <ModalOuterContainer extraClasses="response-modal">
        {/* ##Needs css## */}
        <div
            className="size-lg-12"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center'
            }}
        >
            <i
                className="fa fa-times"
                style={{
                    borderRadius: '100%',
                    backgroundColor: 'red',
                    color: 'white',
                    fontSize: '3em',
                    padding: '0.5em'
                }}
            />
        </div>
        <BlockHeading title={title} />
        <p>{message}</p>
        <br />
        {error && <p>{error}</p>}
        <BlockButtonWrapper>
            <button className="button" onClick={hideModal}>
                Cancel
            </button>
            <button
                className={`button yellow ${disbaledButton ? 'disabled' : ' '}`}
                disabled={disbaledButton}
                onClick={e => resubmit(e)}
            >
                Try again
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default PaymentErrorModal;
