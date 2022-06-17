import React from 'react';
import { useLocation } from 'react-router-dom';

import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const BuyBolsterPlusConfirmationModal = ({ paymentType, hideModal }) => {
    const location = useLocation();
    return (
        <FlexModalOuter title="Bolster Plus Purchase Confirmation" hideCloseButton>
            <BlockContainer>
                <p>
                    Your order has been placed successfully.
                    {paymentType === PAYMENT_IDS.CARD
                        ? ''
                        : ' Your new service will be available for use once the invoice has been paid.'}
                </p>
                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    {location.pathname !== '/company/subscription' && (
                        <a
                            href="/company/subscription"
                            className="link-without-decoration text-colour"
                        >
                            <ActionButton
                                text="Go to Account Overview "
                                size="medium"
                                onClick={() => hideModal()}
                                source="secondary"
                            />
                        </a>
                    )}

                    <ActionButton text="OK" size="medium" onClick={() => hideModal()} />
                </ButtonWrapper>
            </BlockContainer>
        </FlexModalOuter>
    );
};

export default BuyBolsterPlusConfirmationModal;
