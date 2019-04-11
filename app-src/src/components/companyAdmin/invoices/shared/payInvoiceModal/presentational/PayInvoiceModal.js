import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

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
                    selectedOption={selectedCard}
                    handleChange={handleChange}
                />
            </div>
            <BlockButtonWrapper>
                <button className="button" type="submit">
                    Pay invoice
                </button>
                <button
                    className="button"
                    onClick={e => {
                        e.preventDefault();
                        hideModal();
                    }}
                >
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default PayInvoiceModal;
