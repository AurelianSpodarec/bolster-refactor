import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AddServiceToSubscriptionModal = ({
    handleSubmit,
    handleChange,
    hideModal,
    paymentType,
    cards,
    selectedCard,
    service,
    proRataCost
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Add service to your subscription" />
        <p className="generic-text intro-text size-lg-12">
            Adding the <strong>{service.name}</strong> service to your
            subscription will increase your yearly renewal from{' '}
            <strong>£{proRataCost.currentAnnualCost}</strong> to{' '}
            <strong>£{proRataCost.newAnnualCost}</strong>, you will be billed
            pro-rata for your remaining subscription, leaving a{' '}
            <strong>£{proRataCost.proRataCost}</strong> fee to pay now.
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
            {+paymentType === PAYMENT_IDS.CARD && (
                <Field name="Select Card" sizeClasses="size-lg-12">
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
                        selectedOption={selectedCard}
                        handleChange={handleChange}
                    />
                </Field>
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

export default AddServiceToSubscriptionModal;
