import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';
import Field from 'components/shared/generic/form/presentational/Field';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const EditPaymentModal = ({
    hideModal,
    paymentValue,
    invoiceBalance,
    handleSubmit,
    handleUpdateValue,
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit Payment" />

            <Form onSubmit={handleSubmit}>
                <p className="generic-text intro-text size-lg-12">
                    {` Please enter the value you wish to edit this payment to.
                    This invoice currently has a balance of £${invoiceBalance.toFixed(2)}.`}
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

                <div className="size-lg-12">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={hideModal}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                    </ButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditPaymentModal;
