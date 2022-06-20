import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import { formatNumber } from 'helpers/generic';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import AddCardFormContainer from '../../cardManagement/addCardModal/containers/AddCardFormContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

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
    checkedServices,
    handleCreditsChange,
    costWithVAT = 0,
    costWithoutVAT = 0,
    creditsToBuy = 0,
    selectedServiceNames,
    addCardVisible,
    hideAddCard,
    handleAddCardSuccess,
    isPosting,
    shouldReceiveFreeCredit,
}) =>
    addCardVisible ? (
        <AddCardFormContainer close={hideAddCard} onSuccess={handleAddCardSuccess} />
    ) : (
        <FlexModalOuter title="Add services to your subscription">
            <Form className="generic-form flex-content-wrapper" onSubmit={handleSubmit}>
                <div className="flex-content">
                    {selectedServiceNames.length > 0 ? (
                        <p className="generic-text size-lg-12">
                            Adding:
                            <br />
                            {selectedServiceNames.map(serviceName => (
                                <strong key={serviceName}>
                                    {serviceName + ' '} <br />
                                </strong>
                            ))}
                            {selectedServiceNames.length > 1 ? 'These services ' : 'This service '}
                            will be added to your subscription and will increase your yearly renewal
                            from <strong>
                                £{formatNumber(proRataCost.currentAnnualCost)}
                            </strong> to <strong>£{formatNumber(proRataCost.newAnnualCost)}</strong>
                            , you will be billed pro-rata for your remaining subscription, leaving a{' '}
                            <strong>£{formatNumber(proRataCost.proRataCost)} (exc. VAT) </strong>
                            fee to pay now.
                        </p>
                    ) : (
                        ''
                    )}

                    <div className="form-fields-container">
                        <Field name="Available Services">
                            <CheckboxListContainer
                                name="serviceIDs"
                                handleChange={handleChange}
                                options={services}
                                selectedOptions={checkedServices}
                            />
                        </Field>
                        <Field name="Credits to buy" sizeClasses="size-lg-12">
                            {shouldReceiveFreeCredit && (
                                <p className="generic-text field-info">
                                    If you buy credits in blocks of 10 you will receive 1 free
                                    credit.
                                </p>
                            )}
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
                                {costWithVAT > costWithoutVAT && (
                                    <> (£{formatNumber(costWithVAT)} inc. VAT) </>
                                )}
                            </p>
                        )}
                        <p className="generic-text total-text align-right size-lg-12">
                            Total to pay now: £
                            {formatNumber(costWithoutVAT + proRataCost.proRataCost)} (£
                            {formatNumber(costWithVAT + proRataCost.proRataCostWithVAT)} inc. VAT)
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
                                            : 'Please select a card'
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
                                    <ButtonWrapper>
                                        <ActionButton
                                            text="Add new card"
                                            onClick={showAddCard}
                                            icon="plus"
                                            size="small"
                                            ambient="positive"
                                        />
                                    </ButtonWrapper>
                                    <br />
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
                    </div>
                    <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                        <ActionButton text="Cancel" onClick={hideModal} source="secondary" />
                        <ActionButton
                            type="submit"
                            disabled={isPosting}
                            text="Confirm"
                            icon={isPosting ? 'fa fa-spinner fa-spin' : 'check'}
                        />
                    </ButtonWrapper>
                    <FlexWrapper justify="end">
                        <p>
                            Upon clicking 'Buy' you are agreeing to Bolster Systems {''}
                            <a
                                href="/auth/terms"
                                target="_blank"
                                className="switched underline text-colour "
                            >
                                sales terms.
                            </a>
                        </p>
                    </FlexWrapper>
                </div>
            </Form>
        </FlexModalOuter>
    );

export default AddMulitpleServicesToSubscriptionModal;
