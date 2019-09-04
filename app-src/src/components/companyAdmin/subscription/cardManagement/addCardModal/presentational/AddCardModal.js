import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import AddCardForm from 'components/stripe/AddCardForm';
import {StripeProvider, Elements, CardElement} from 'react-stripe-elements';

const AddCardModal = ({
    handleChange,
    handleSubmit,
    nickname,
    name,
    cardNumber,
    expiryMonth,
    expiryYear,
    CV2,
    validateMaxLength,
    postError,
    close,
    postingError
}) => {
    return (
        <ModalOuterContainer close={close}>
            <BlockHeading title="Add card" />

            <StripeProvider apiKey="pk_test_QUrrYsRQKFyb1Os4ler16ke1">
                <Elements>
                    <AddCardForm />
                </Elements>
            </StripeProvider>
        </ModalOuterContainer>
    );
};

export default AddCardModal;
