import React from 'react';
// import { Link } from 'react-router-dom';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';
import Field from 'components/shared/generic/form/presentational/Field';

const EditPaymentModal = ({
    hideModal,
    paymentValue,
    invoiceBalance,
    handleSubmit,
    handleUpdateValue
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit Payment" />

            <Form onSubmit={handleSubmit}>
                <p className="generic-text intro-text size-lg-12">
                    {` Please enter the value you wish to edit this payment to.
                    This invoice currently has a balance of £${invoiceBalance.toFixed(
                        2
                    )}.`}
                </p>
                <Field name="Enter value" required>
                    <CurrencyInput
                        name="paymentValue"
                        placeholder="00.00"
                        value={paymentValue}
                        onChange={handleUpdateValue}
                        required
                    />
                </Field>
                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        <i className="far fa-check" />
                        Confirm
                    </button>
                    <button className="button red" onClick={hideModal}>
                        <i className="far fa-times" />
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditPaymentModal;
