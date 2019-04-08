import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import Field from 'components/shared/generic/form/presentational/Field';

const SubscriptionAutoRenewal = () => {
    return (
        <BlockContainer>
            <PageHeading title="Auto-Renewal" />

            <Form>
                <Field>
                    <input
                        id="radio-card"
                        type="radio"
                        name="paymentMethod"
                        value="card"
                    />
                    <label htmlFor="radio-card">Pay using card</label>
                    <Dropdown options={[]} />
                </Field>
                <Field>
                    <input
                        id="radio-invoice"
                        type="radio"
                        name="paymentMethod"
                        value="invoice"
                    />
                    <label htmlFor="radio-invoice">Pay by invoice</label>
                    <p>
                        Note: Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Qui architecto voluptas, nisi
                        explicabo eveniet saepe voluptates reiciendis doloribus,
                        assumenda quam dolorum ut ad ducimus est.
                    </p>
                </Field>
            </Form>
        </BlockContainer>
    );
};

export default SubscriptionAutoRenewal;
