import React from 'react';
import { Link } from 'react-router-dom';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { formatNumber } from 'helpers/generic';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const AddServiceToSubscriptionModal = ({
    handleSubmit,
    handleChange,
    hideModal,
    paymentType,
    cards,
    selectedCard,
    service,
    proRataCost,
    noCards,
    termsAgreed
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Add service to your subscription" />
        <p className="generic-text intro-text size-lg-12">
            Adding the <strong>{service.name}</strong> service to your
            subscription will increase your yearly renewal from{' '}
            <strong>£{formatNumber(proRataCost.currentAnnualCost)}</strong> to{' '}
            <strong>£{formatNumber(proRataCost.newAnnualCost)}</strong>, you
            will be billed pro-rata for your remaining subscription, leaving a{' '}
            <strong>£{formatNumber(proRataCost.proRataCost)}</strong> fee to pay
            now.
        </p>

        <Form className="generic-form" onSubmit={handleSubmit}>
            <Field name="Auto renewal">
                <div className="size-lg-6">
                    <RadioButton
                        name="paymentType"
                        value={PAYMENT_IDS.CARD}
                        checked={+paymentType === PAYMENT_IDS.CARD}
                        handleInputChange={handleChange}
                        text="Pay using card"
                        extraDetails={noCards ? 'No cards available' : ''}
                        disabled={noCards}
                    />
                </div>

                <div className="size-lg-6">
                    <RadioButton
                        name="paymentType"
                        value={PAYMENT_IDS.INVOICE}
                        checked={+paymentType === PAYMENT_IDS.INVOICE}
                        handleInputChange={handleChange}
                        text="Pay by invoice"
                    />
                </div>
            </Field>
            {+paymentType === PAYMENT_IDS.CARD && noCards && (
                <Field
                    name="Select Card"
                    sizeClasses="size-lg-12"
                    required={+paymentType === PAYMENT_IDS.CARD}
                >
                    <DropdownContainer
                        disabled={+paymentType !== PAYMENT_IDS.CARD}
                        required={+paymentType === PAYMENT_IDS.CARD}
                        withoutPlaceholder
                        placeholder={
                            !cards.length
                                ? 'Please add a card to use card payments.'
                                : 'Loading cards...'
                        }
                        name="stripeCardID"
                        options={cards}
                        value={selectedCard}
                        selectedOption={selectedCard}
                        handleChange={handleChange}
                    />
                </Field>
            )}
            <div className="size-lg-6 size-md-12">
                <Field name="Agree to terms" required>
                    <p>
                        Please check that you agree with the{' '}
                        <Link to="/auth/terms ">sales terms</Link> to proceed
                        with payment.
                    </p>
                    <CheckboxContainer
                        checked={termsAgreed}
                        handleChange={handleChange}
                        name={'termsAgreed'}
                        required
                    />
                </Field>
            </div>

            <BlockButtonWrapper>
                <button className="button green" type="submit">
                    Buy
                </button>
                <ButtonContainer handleClick={hideModal}>
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default AddServiceToSubscriptionModal;
