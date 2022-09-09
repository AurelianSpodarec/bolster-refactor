import React, { useState } from 'react';

import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const BolsterPlusPaymentErrorModal = ({
    title = 'Payment Failed',
    message = 'Something went wrong while trying to take your payment, please try again',
    resubmit,
    hideModal,
    disbaled,
    error,
    handleClose,
}) => {
    const [disbaledButton, setDisbaledButton] = useState(disbaled);

    const handleResubmit = e => {
        setDisbaledButton(true);
        setTimeout(() => {
            setDisbaledButton(false);
        }, 3000);
        resubmit(e);
    };

    return (
        <FlexModalOuter title={title} extraClasses="response-modal">
            <div className="flex-content-wrapper">
                <div className="flex-content">
                    <p className="generic-text">{message}</p>
                    {error && <p className="generic-text error">{error}</p>}
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Cancel"
                        source="secondary"
                        onClick={() => {
                            if (handleClose) {
                                handleClose();
                            } else {
                                if (location.pathname === '/company/subscription') {
                                    hideModal();
                                } else {
                                    history.goBack();
                                }
                            }

                            hideModal();
                        }}
                    />
                    <ActionButton
                        text="Try Again"
                        disabled={disbaledButton}
                        onClick={e => handleResubmit(e)}
                    />
                </ButtonWrapper>
            </div>
        </FlexModalOuter>
    );
};

export default BolsterPlusPaymentErrorModal;
