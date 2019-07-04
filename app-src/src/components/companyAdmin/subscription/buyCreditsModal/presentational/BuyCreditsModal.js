import React from 'react';
import { Link } from 'react-router-dom';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { formatNumber } from 'helpers/generic';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import AddCardFormContainer from '../../cardManagement/addCardModal/containers/AddCardFormContainer';
import Select from 'components/shared/generic/form/presentational/Select';

const BuyCreditsModal = ({
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
    termsAgreed
}) => {
    if (addCardVisible)
        return (
            <AddCardFormContainer
                close={hideAddCard}
                onSuccess={handleAddCardSuccess}
            />
        );

    return (
        <ModalOuterContainer>
            <BlockHeading
                title="Buy Credits"
                subTitle={`You have ${credits} credits available.`}
            />
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
                    <>
                        <Field sizeClasses="size-lg-12">
                            <button
                                className="button green"
                                type="button"
                                onClick={showAddCard}
                            >
                                <i className="fa fa-plus fa-fw" /> Add new card
                            </button>
                        </Field>
                        <Field
                            sizeClasses="size-lg-12"
                            name="Select Card"
                            required
                        >
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
                <Field name="Credits to buy" sizeClasses="size-lg-12" required>
                    <p className="field-info">
                        If you buy credits in blocks of 10 you will receive 1
                        free credit.
                    </p>
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
                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        Buy
                    </button>
                    <ButtonContainer handleClick={hideModal}>
                        Cancel
                    </ButtonContainer>
                </BlockButtonWrapper>
                <div className="size-lg-6 size-md-12">
                    <Field name="Agree to terms" required>
                        <p className="generic-text size-lg-12">
                            Please check that you agree with the{' '}
                            <Link to="/auth/terms ">sales terms</Link> to
                            proceed with payment.
                        </p>
                        <CheckboxContainer
                            checked={termsAgreed}
                            handleChange={handleChange}
                            name={'termsAgreed'}
                            required
                        />
                    </Field>
                </div>{' '}
            </Form>
        </ModalOuterContainer>
    );
};

export default BuyCreditsModal;
