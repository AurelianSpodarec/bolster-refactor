import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CurrencyInput from 'components/shared/generic/form/presentational/CurrencyInput';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';

const InvoicePayments = ({
    isFetching,
    error,
    invoice,
    company,
    paymentValue,
    handleChange
}) => {
    return (
        <BlockContainer
            containerClass="size-lg-4"
            error={error}
            isEmpty={!invoice || !company}
            isFetching={isFetching}
        >
            <BlockHeading title="Invoice Payments">
                <button className={'button red'}>
                    <i className="far fa-money-bill-alt" /> Make Free
                </button>
            </BlockHeading>
            <Form>
                <Field name="Invoice Balance">
                    <p>##£1600.00##</p>
                </Field>
                <Field
                    sizeClasses="size-lg-6"
                    required
                    name="Enter Customer Payment"
                >
                    <CurrencyInput
                        value={paymentValue}
                        name="paymentValue"
                        type="number"
                        placeholder="£00.00"
                        handleChange={handleChange}
                    />
                </Field>
                <BlockButtonWrapper>
                    <button className={'button green'}>
                        <i className="far fa-money-bill-alt" /> Record Payment
                    </button>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    );
};

export default InvoicePayments;
