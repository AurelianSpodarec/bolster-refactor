import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddCardForm from 'components/stripe/AddCardForm';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { STRIPE_PUBLIC_KEY } from 'config';

const AddCardModal = ({ close }) => {
    return (
        <ModalOuterContainer close={close}>
            <BlockHeading title="Add card" />

            <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
                <Elements>
                    <AddCardForm close={close} />
                </Elements>
            </StripeProvider>
        </ModalOuterContainer>
    );
};

export default AddCardModal;
