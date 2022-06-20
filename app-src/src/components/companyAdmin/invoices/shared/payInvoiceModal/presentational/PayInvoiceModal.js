import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'components/shared/generic/form/containers/Form';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const PayInvoiceModal = ({
    handleSubmit,
    handleChange,
    hideModal,
    cards,
    selectedCard,
    termsAgreed,
    isPosting,
}) => (
    <FlexModalOuter title="Pay invoice">
        <Form className="generic-form flex-content-wrapper" onSubmit={handleSubmit}>
            <div className="flex-content">
                <div className="form-fields-container">
                    <Field>
                        <DropdownContainer
                            required
                            withoutPlaceholder
                            name="stripeCardID"
                            options={cards}
                            placeholder={
                                !cards.length
                                    ? 'Please add a card to use card payments.'
                                    : 'Loading cards...'
                            }
                            value={selectedCard}
                            selectedOption={selectedCard}
                            handleChange={handleChange}
                        />
                    </Field>
                </div>
                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Cancel"
                        onClick={e => {
                            e.preventDefault();
                            hideModal();
                        }}
                        source="secondary"
                    />
                    <ActionButton
                        text="Confirm"
                        type="submit"
                        disabled={isPosting}
                        icon={isPosting ? 'spinner' : 'check'}
                        iconSpin={isPosting}
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

export default PayInvoiceModal;
