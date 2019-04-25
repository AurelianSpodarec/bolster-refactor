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
import { formatNumber } from 'helpers/generic';

const BuyCreditsModal = ({
    hideModal,
    handleChange,
    handleSubmit,
    paymentType,
    creditsToBuy,
    cards,
    selectedCard,
    costOfCredits,
    noCards
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Buy Credits" />
            <Form
                className="generic-form no-min-heights"
                onSubmit={handleSubmit}
            >
                <Field sizeClasses="size-lg-6">
                    <RadioButton
                        name={'paymentType'}
                        value={PAYMENT_IDS.CARD}
                        text="Pay by card"
                        handleInputChange={handleChange}
                        checked={+paymentType === PAYMENT_IDS.CARD}
                        extraDetails={noCards ? 'No cards available' : ''}
                        disabled={noCards}
                    />
                </Field>
                <Field sizeClasses="size-lg-6">
                    <RadioButton
                        name={'paymentType'}
                        value={PAYMENT_IDS.INVOICE}
                        text="Pay by invoice"
                        handleInputChange={handleChange}
                        checked={+paymentType === PAYMENT_IDS.INVOICE}
                    />
                </Field>
                {+paymentType === PAYMENT_IDS.CARD && !noCards && (
                    <Field sizeClasses="size-lg-12" name="Select Card">
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
                    </Field>
                )}
                <Field name="Credits to buy" sizeClasses="size-lg-12">
                    <TextInputContainer
                        name="creditsToBuy"
                        value={creditsToBuy}
                        handleChange={handleChange}
                        placeholder="Number of credits..."
                        required
                        type="number"
                        validate={value =>
                            value <= 0 || value % 1
                                ? 'Please enter a positive integer.'
                                : ''
                        }
                        classes="large"
                    />
                </Field>
                {creditsToBuy && (
                    <p className="generic-text total-text align-right size-lg-12">
                        Total: £{formatNumber(costOfCredits * creditsToBuy)}
                    </p>
                )}
                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        Buy
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
