import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import { SUBSCRIPTION_RENEWAL_IDS } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const SubscriptionAutoRenewal = ({
    isAutoRenew,
    renewalType,
    handleAutoRenewChange,
    handleRadioChange,
    noCards,
    active,
    expiresWithin2Days,
}) => (
    <Form className="size-lg-12">
        <BlockHeading title="Auto-Renewal">
            <CheckboxContainer
                name={'isAutoRenew'}
                value={isAutoRenew}
                handleChange={handleAutoRenewChange}
                checked={!!isAutoRenew}
                disabled={!active}
            />
        </BlockHeading>
        <div className="generic-form no-min-heights size-lg-12">
            <Field htmlFor="radio-card">
                <RadioButton
                    id="radio-card"
                    name="paymentMethod"
                    value={SUBSCRIPTION_RENEWAL_IDS.CARD}
                    checked={renewalType === SUBSCRIPTION_RENEWAL_IDS.CARD}
                    disabled={!isAutoRenew || noCards || expiresWithin2Days}
                    text="Pay using card"
                    handleInputChange={handleRadioChange}
                    extraDetails={noCards ? 'No cards available' : ''}
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
                    disabled={!isAutoRenew || expiresWithin2Days}
                    handleInputChange={handleRadioChange}
                    extraDetails="'You can choose to pay for your renewal with either your default credit card or by invoice'"
                />
                {expiresWithin2Days && (
                    <p className="size-lg-12" style={{ paddingTop: 10, color: 'red' }}>
                        <strong>Note:</strong> You will be able to update your payment method when
                        your new subscription begins.
                    </p>
                )}
            </Field>
        </div>
    </Form>
);

export default SubscriptionAutoRenewal;
