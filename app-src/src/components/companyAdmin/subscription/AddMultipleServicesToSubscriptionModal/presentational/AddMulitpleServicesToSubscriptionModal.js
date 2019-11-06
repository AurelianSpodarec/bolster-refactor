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
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import AddCardFormContainer from '../../cardManagement/addCardModal/containers/AddCardFormContainer';

const AddMulitpleServicesToSubscriptionModal = ({
    handleSubmit,
    handleChange,
    hideModal,
    paymentType,
    cards,
    selectedCard,
    services,
    proRataCost,
    showAddCard,
    noCards,
    termsAgreed,
    checkedServices,
    handleCreditsChange,
    costWithVAT = 0,
    costWithoutVAT = 0,
    creditsToBuy = 0,
    selectedServiceNames,
    addCardVisible,
    hideAddCard,
    handleAddCardSuccess
}) => addCardVisible ? 
<AddCardFormContainer
close={hideAddCard}
onSuccess={handleAddCardSuccess} /> :
(
    <ModalOuterContainer>
        <BlockHeading title="Add services to your subscription" />
        {selectedServiceNames.length > 0 ? (
            <p className="generic-text intro-text size-lg-12">
                Adding:
                <br />
                {selectedServiceNames.map(serviceName => (
                    <strong key={serviceName}>
                        {serviceName + ' '} <br />
                    </strong>
                ))}
                {selectedServiceNames.length > 1 ? 'These services ' : 'This service '}
                will be added to your subscription and will increase your yearly renewal from{' '}
                <strong>£{formatNumber(proRataCost.currentAnnualCost)}</strong> to{' '}
                <strong>£{formatNumber(proRataCost.newAnnualCost)}</strong>, you will be billed
                pro-rata for your remaining subscription, leaving a{' '}
                <strong>£{formatNumber(proRataCost.proRataCost)} (exc. VAT) </strong>
                fee to pay now.
            </p>
        ) : (
            ''
        )}

        <Form className="generic-form" onSubmit={handleSubmit}>
            <Field name="Available Services">
                <CheckboxListContainer
                    name="serviceIDs"
                    handleChange={handleChange}
                    options={services}
                    selectedOptions={checkedServices}
                />
            </Field>
            <Field name="Credits to buy" sizeClasses="size-lg-12">
                <p className="field-info">
                    If you buy credits in blocks of 10 you will receive 1 free credit.
                </p>
                <TextInputContainer
                    name="creditsToBuy"
                    value={creditsToBuy}
                    handleChange={handleCreditsChange}
                    placeholder="Number of credits..."
                    termsAgreed
                    type="number"
                    validate={value =>
                        value < 0 || value % 1 ? 'Please enter a positive integer.' : ''
                    }
                    classes="large"
                />
            </Field>
            {creditsToBuy && (
                <p className="generic-text total-text align-right size-lg-12">
                    Total for credits: £{formatNumber(costWithoutVAT)}
                    {costWithVAT > costWithoutVAT && <> (£{formatNumber(costWithVAT)} inc. VAT) </>}
                </p>
            )}
                <p className="generic-text total-text align-right size-lg-12">
                    Total to pay now: £{formatNumber(costWithVAT + proRataCost.proRataCost)} (£{formatNumber(costWithVAT + proRataCost.proRataCostWithVAT)} inc. VAT)
                </p>
            <Field name="Payment Type">
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
            {+paymentType === PAYMENT_IDS.CARD && !noCards && (
                <>
                    <Field sizeClasses="size-lg-12" name="Select Card" required>
                        <button className="button green" type="button" onClick={showAddCard}>
                            <i className="fa fa-plus fa-fw" /> Add new card
                        </button>
                        <Select
                            required
                            name="stripeCardID"
                            options={cards}
                            omitPlaceholder={!!cards.length}
                            placeholder={
                                !cards.length
                                    ? 'Please add a card to use card payments.'
                                    : 'Loading cards...'
                            }
                            value={selectedCard}
                            onChange={handleChange}
                        />
                    </Field>
                </>
            )}
            <div className="size-lg-6 size-md-12">
                <Field name="Agree to terms" required>
                    <p className="generic-text size-lg-12">
                        Please check that you agree with the{' '}
                        <Link to="/auth/terms ">sales terms</Link> to proceed with payment.
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
                <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default AddMulitpleServicesToSubscriptionModal;
