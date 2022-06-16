import React from 'react';

import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';

const BuyBolsterPlusConfirmationModal = ({ paymentType, hideModal }) => {
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
                    <LinkButton
                        text="OK"
                        href="/company/subscription"
                        size="medium"
                        onClick={hideModal}
                    />
                </ButtonWrapper>
            </BlockContainer>
        </FlexModalOuter>
    );
};

export default BuyBolsterPlusConfirmationModal;
