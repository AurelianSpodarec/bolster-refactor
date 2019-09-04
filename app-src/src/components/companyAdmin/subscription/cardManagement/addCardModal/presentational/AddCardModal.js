import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddCardForm from 'components/stripe/AddCardForm';
import { StripeProvider, Elements } from 'react-stripe-elements';

const AddCardModal = ({ close }) => {
    return (
        <ModalOuterContainer close={close}>
            <BlockHeading title="Add card" />

            <StripeProvider apiKey="pk_test_QUrrYsRQKFyb1Os4ler16ke1">
                <Elements>
                    <AddCardForm close={close} />
                </Elements>
            </StripeProvider>
        </ModalOuterContainer>
    );
};

export default AddCardModal;
