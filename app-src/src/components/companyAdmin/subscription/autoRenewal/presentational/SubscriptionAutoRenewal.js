import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import Field from 'components/shared/generic/form/presentational/Field';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';

const SubscriptionAutoRenewal = ({
    isAutoRenew,
    handleAutoRenewChange,
    handleRadioChange
}) => (
    <>
        <Field name="Auto-Renewal" sizeClasses="size-lg-12 heading heading-3">
            <Checkbox
                name={'isAutoRenew'}
                value={isAutoRenew}
                handleChange={handleAutoRenewChange}
                checked={!!isAutoRenew}
            />
        </Field>
        <Form>
            <Field name="Pay using card" htmlFor="radio-card">
                <input
                    id="radio-card"
                    type="radio"
                    name="paymentMethod"
                    value="card"
                />
                <Dropdown options={[]} handleChange={handleRadioChange} />
            </Field>
            <Field name="Pay by invoice" htmlFor="radio-invoice">
                <input
                    id="radio-invoice"
                    type="radio"
                    name="paymentMethod"
                    value="invoice"
                />
                <br />
                <label htmlFor="radio-invoice">
                    Note: Lorem ipsum dolor sit, amet consectetur adipisicing
                    elit. Qui architecto voluptas, nisi explicabo eveniet saepe
                    voluptates reiciendis doloribus, assumenda quam dolorum ut
                    ad ducimus est.
                </label>
            </Field>
        </Form>
    </>
);

export default SubscriptionAutoRenewal;
