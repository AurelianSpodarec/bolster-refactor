import React from 'react';

import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import Select from 'components/shared/generic/form/presentational/Select';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const AddBolsterPlusModal = ({
    hideModal,
    handleChange,
    handleSubmit,
    paymentType,
    creditsToBuy = 0,
    cards,
    credits,
    selectedCard,
    handleCreditsChange,
    costWithVAT,
    costWithoutVAT,
    noCards,
    addCardVisible,
    showAddCard,
    hideAddCard,
    handleAddCardSuccess,
    termsAgreed,
    isPosting,
    shouldReceiveFreeCredit,
}) => {
    return (
        <FlexModalOuter title="Add Bolster Plus Subscription">
            <div className="flex-content">
                <p className="generic-text">This service will be added ...</p>
            </div>

            <Form
                className="generic-form flex-content-wrapper no-min-heights"
                onSubmit={handleSubmit}
            >
                <div className="flex-content">
                    <Field name="Payment Method" sizeClasses="size-lg-12" required>
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
                            <>
                                <Field sizeClasses="size-lg-12">
                                    <ActionButton
                                        text="Add new card"
                                        type="submit"
                                        onClick={showAddCard}
                                        icon="plus"
                                        size="small"
                                        ambient="positive"
                                    />
                                </Field>
                                <Field sizeClasses="size-lg-12" name="Select Card" required>
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
                    </Field>

                    <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                        <ActionButton
                            text="Cancel"
                            onClick={hideModal}
                            source="secondary"
                            size="medium"
                        />
                        <ActionButton
                            text="Buy"
                            type="submit"
                            icon={isPosting ? 'spinner' : ''}
                            iconSpin={isPosting}
                            disabled={isPosting}
                            size="medium"
                        />
                    </ButtonWrapper>

                    <FlexWrapper justify="end">
                        <p>
                            By clicking Buy you are agreeing with Bolster System {''}
                            <a to="/auth/terms" target="_blank" className="switched underline">
                                sales terms
                            </a>
                        </p>
                    </FlexWrapper>
                </div>
            </Form>
        </FlexModalOuter>
    );
};

export default AddBolsterPlusModal;
