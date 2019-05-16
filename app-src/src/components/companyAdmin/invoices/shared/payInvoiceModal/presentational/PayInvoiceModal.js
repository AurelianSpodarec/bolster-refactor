import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const PayInvoiceModal = ({
    handleSubmit,
    handleChange,
    hideModal,
    cards,
    selectedCard
}) => (
    <ModalOuterContainer>
        <BlockHeading title="Pay invoice" />
        <Form className="generic-form" onSubmit={handleSubmit}>
            <div className="size-lg-6">
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
            </div>
            <BlockButtonWrapper>
                <button className="button green" type="submit">
                    Pay invoice
                </button>
                <ButtonContainer
                    handleClick={e => {
                        e.preventDefault();
                        hideModal();
                    }}
                >
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default PayInvoiceModal;
