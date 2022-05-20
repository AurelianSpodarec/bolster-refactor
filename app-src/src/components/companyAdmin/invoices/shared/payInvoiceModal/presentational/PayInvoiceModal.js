import React from 'react';
import { Link } from 'react-router-dom';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

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

                    <Field name="Agree to terms" required>
                        <p className="generic-text size-lg-12">
                            Please check that you agree with the{' '}
                            <Link to="/auth/terms" target="_blank" className="switched">
                                sales terms
                            </Link>{' '}
                            to proceed with payment.
                        </p>
                        <CheckboxContainer
                            checked={termsAgreed}
                            handleChange={handleChange}
                            name={'termsAgreed'}
                            required
                        />
                    </Field>
                </div>
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
        </Form>
    </FlexModalOuter>
);

export default PayInvoiceModal;
