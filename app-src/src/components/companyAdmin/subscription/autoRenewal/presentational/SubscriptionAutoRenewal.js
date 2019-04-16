import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import { SUBSCRIPTION_RENEWAL_IDS } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';

const SubscriptionAutoRenewal = ({
    isAutoRenew,
    renewalType,
    handleAutoRenewChange,
    handleRadioChange
}) => (
    <Form className="size-lg-12">
        <BlockHeading title="Auto-Renewal">
            <Checkbox
                name={'isAutoRenew'}
                value={isAutoRenew}
                handleChange={handleAutoRenewChange}
                checked={!!isAutoRenew}
            />
        </BlockHeading>
        <div className="generic-form size-lg-12">
            <Field htmlFor="radio-card">
                <RadioButton
                    id="radio-card"
                    name="paymentMethod"
                    value={SUBSCRIPTION_RENEWAL_IDS.CARD}
                    checked={renewalType === SUBSCRIPTION_RENEWAL_IDS.CARD}
                    disabled={!isAutoRenew}
                    text="Pay using card"
                    handleInputChange={handleRadioChange}
                />
            </Field>

            <Field htmlFor="radio-invoice">
                <RadioButton
                    id="radio-invoice"
                    type="radio"
                    name="paymentMethod"
                    text="Pay by invoice"
                    value={SUBSCRIPTION_RENEWAL_IDS.INVOICE}
                    checked={renewalType === SUBSCRIPTION_RENEWAL_IDS.INVOICE}
                    disabled={!isAutoRenew}
                    handleInputChange={handleRadioChange}
                    extraDetails=" You can choose to pay for your renewal with either your default credit card or by invoice"
                />
            </Field>
        </div>
    </Form>
);

export default SubscriptionAutoRenewal;
