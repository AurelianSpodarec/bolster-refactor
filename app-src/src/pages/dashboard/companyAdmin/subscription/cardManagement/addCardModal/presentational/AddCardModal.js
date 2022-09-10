import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import { STRIPE_PUBLIC_KEY } from 'config';

import AddCardForm from 'components_DEPRECATED/stripe/AddCardForm';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const AddCardModal = ({ hideModal, close }) => {
    return (
        <FlexModalOuter title="Add card">
            <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
                <Elements>
                    <AddCardForm close={close ? close : hideModal} />
                </Elements>
            </StripeProvider>
        </FlexModalOuter>
    );
};

export default AddCardModal;
