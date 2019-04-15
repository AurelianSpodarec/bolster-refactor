import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const BuyCreditsModal = ({
    hideModal,
    handleChange,
    handleSubmit,
    paymentType,
    creditsToBuy,
    cards,
    selectedCard,
    costOfCredits
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Buy Credits" />
            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-6">
                    <RadioButton
                        name={'paymentType'}
                        value={PAYMENT_IDS.CARD}
                        text="Pay by card"
                        handleInputChange={handleChange}
                        checked={+paymentType === PAYMENT_IDS.CARD}
                    />
                    {+paymentType === PAYMENT_IDS.CARD && (
                        <DropdownContainer
                            required
                            name="stripeCardID"
                            options={cards}
                            withoutPlaceholder
                            placeholder={
                                !cards.length
                                    ? 'Please add a card to use card payments.'
                                    : 'Loading cards...'
                            }
                            selectedOption={selectedCard}
                            handleChange={handleChange}
                        />
                    )}
                </div>
                <div className="size-lg-6">
                    <RadioButton
                        name={'paymentType'}
                        value={PAYMENT_IDS.INVOICE}
                        text="Pay by invoice"
                        handleInputChange={handleChange}
                        checked={+paymentType === PAYMENT_IDS.INVOICE}
                    />
                </div>
                <div className="size-lg-12">
                    <Field name="Credits to buy">
                        <TextInputContainer
                            name="creditsToBuy"
                            value={creditsToBuy}
                            handleChange={handleChange}
                            placeholder="Number of credits to buy"
                            required
                            type="number"
                            validate={value =>
                                value <= 0 || value % 1
                                    ? 'Please enter a positive integer.'
                                    : ''
                            }
                        />
                        {creditsToBuy && (
                            <p>Total : £{costOfCredits * creditsToBuy}</p>
                        )}
                    </Field>
                </div>
                <BlockButtonWrapper>
                    <button className="button" type="submit">
                        Buy credits
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default BuyCreditsModal;
