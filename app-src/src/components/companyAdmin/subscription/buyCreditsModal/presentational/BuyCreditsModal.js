import React from 'react';
import { Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { formatNumber } from 'helpers/generic';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import AddCardFormContainer from '../../cardManagement/addCardModal/containers/AddCardFormContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import PaymentMethod from '../../paymentMethod/PaymentMethod';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const BuyCreditsModal = ({
    hideModal,
    handleChange,
    handleSubmit,
    creditsToBuy = 0,
    credits,
    handleCreditsChange,
    costWithVAT,
    costWithoutVAT,
    addCardVisible,
    hideAddCard,
    handleAddCardSuccess,
    termsAgreed,
    isPosting,
    shouldReceiveFreeCredit,
    paymentType,
    cards,
    selectedCard,
    noCards,
    showAddCard,
}) => {
    if (addCardVisible)
        return <AddCardFormContainer close={hideAddCard} onSuccess={handleAddCardSuccess} />;

    return (
        <FlexModalOuter title="Buy Credits">
            <Form
                className="generic-form flex-content-wrapper no-min-heights"
                onSubmit={handleSubmit}
            >
                <div className="flex-content">
                    <p className="generic-text">You have {credits} credits available.</p>

                    <PaymentMethod
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        paymentType={paymentType}
                        cards={cards}
                        selectedCard={selectedCard}
                        noCards={noCards}
                        showAddCard={showAddCard}
                    />

                    <div className="form-fields-container">
                        <Field name="Credits to buy" sizeClasses="size-lg-12" required>
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
                                Total: £{formatNumber(costWithoutVAT)}
                                {costWithVAT > costWithoutVAT && (
                                    <> (£{formatNumber(costWithVAT)} inc. VAT) </>
                                )}
                            </p>
                        )}

                        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                            <ActionButton text="Cancel" onClick={hideModal} source="secondary" />
                            <ActionButton
                                text="Confirm"
                                type="submit"
                                icon={isPosting ? 'spinner' : 'check'}
                                iconSpin={isPosting}
                                disabled={isPosting}
                            />
                        </ButtonWrapper>
                        <FlexWrapper justify="end">
                            <p>
                                By clicking Buy you are agreeing with Bolster System {''}
                                <a
                                    href="/auth/terms"
                                    target="_blank"
                                    className="switched underline text-colour "
                                >
                                    sales terms
                                </a>
                            </p>
                        </FlexWrapper>
                    </div>
                </div>
            </Form>
        </FlexModalOuter>
    );
};

export default BuyCreditsModal;
