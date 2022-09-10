import React from 'react';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import DropdownContainer from 'components_DEPRECATED/shared/generic/form/containers/DropdownContainer';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';
import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';

const PayInvoiceModal = ({
    handleSubmit,
    handleChange,
    hideModal,
    cards,
    selectedCard,
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
