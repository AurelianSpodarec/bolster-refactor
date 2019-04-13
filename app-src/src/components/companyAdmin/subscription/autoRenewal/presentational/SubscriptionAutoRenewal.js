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
    <>
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
                <Field name="Pay using card" htmlFor="radio-card">
                    <RadioButton
                        id="radio-card"
                        name="paymentMethod"
                        value={SUBSCRIPTION_RENEWAL_IDS.CARD}
                        checked={renewalType === SUBSCRIPTION_RENEWAL_IDS.CARD}
                        disabled={!isAutoRenew}
                        handleInputChange={handleRadioChange}
                        extraDetails="##Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Qui architecto voluptas, nisi
                        explicabo eveniet saepe voluptates reiciendis doloribus,
                        assumenda quam dolorum ut ad ducimus est.##"
                    />
                    {/* <input
                        id="radio-card"
                        type="radio"
                        name="paymentMethod"
                        value={SUBSCRIPTION_RENEWAL_IDS.CARD}
                        checked={renewalType === SUBSCRIPTION_RENEWAL_IDS.CARD}
                        disabled={!isAutoRenew}
                        onChange={handleRadioChange}
                    /> */}
                </Field>
                <Field>
                    <Checkbox />
                </Field>
                <Field name="Pay by invoice" htmlFor="radio-invoice">
                    <input
                        id="radio-invoice"
                        type="radio"
                        name="paymentMethod"
                        value={SUBSCRIPTION_RENEWAL_IDS.INVOICE}
                        checked={
                            renewalType === SUBSCRIPTION_RENEWAL_IDS.INVOICE
                        }
                        disabled={!isAutoRenew}
                        onChange={handleRadioChange}
                    />
                    <br />
                    <label htmlFor="radio-invoice">
                        ##Note: Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Qui architecto voluptas, nisi
                        explicabo eveniet saepe voluptates reiciendis doloribus,
                        assumenda quam dolorum ut ad ducimus est.##
                    </label>
                </Field>
            </div>
        </Form>
    </>
);

export default SubscriptionAutoRenewal;
