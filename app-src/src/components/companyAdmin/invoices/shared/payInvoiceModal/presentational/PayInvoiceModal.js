import React from 'react';
import { Link } from 'react-router-dom';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const PayInvoiceModal = ({
    handleSubmit,
    handleChange,
    hideModal,
    cards,
    selectedCard,
    termsAgreed,
    isPosting,
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Pay invoice" />
        <Form className="generic-form" onSubmit={handleSubmit}>
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

            <BlockButtonWrapper>
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Cancel"
                        onClick={e => {
                            e.preventDefault();
                            hideModal();
                        }}
                        source="secondary"
                        size="small"
                    />
                    <ActionButton
                        text="Confirm"
                        type="submit"
                        disabled={isPosting}
                        icon={isPosting ? 'fa fa-spinner fa-spin' : 'check'}
                        size="small"
                    />
                </ButtonWrapper>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default PayInvoiceModal;
