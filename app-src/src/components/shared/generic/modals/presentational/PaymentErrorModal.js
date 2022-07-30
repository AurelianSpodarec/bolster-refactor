import React from 'react';

import FlexModalOuter from './FlexModalOuter';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const PaymentErrorModal = ({
    title = 'Payment Failed',
    message = 'Something went wrong while trying to take your payment, please try again',
    resubmit,
    hideModal,
    disbaledButton,
    error,
}) => (
    <FlexModalOuter title={title} extraClasses="response-modal">
        <div className="flex-content-wrapper">
            <div className="flex-content">
                <p className="generic-text">{message}</p>
                {error && <p className="generic-text error">{error}</p>}
            </div>

            <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                <ActionButton text="Cancel" source="secondary" onClick={hideModal} />
                <ActionButton
                    text="Try Again"
                    disabled={disbaledButton}
                    onClick={e => resubmit(e)}
                />
            </ButtonWrapper>
        </div>
    </FlexModalOuter>
);

export default PaymentErrorModal;
