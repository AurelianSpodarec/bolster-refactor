import React from 'react';

import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import RadioButton from 'components_DEPRECATED/shared/generic/form/presentational/RadioButton';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import Select from 'components_DEPRECATED/shared/generic/form/presentational/Select';

const PaymentMethod = ({
    handleChange,
    paymentType,
    cards,
    selectedCard,
    noCards,
    showAddCard,
}) => {
    return (
        <Form className="generic-form flex-content-wrapper no-min-heights">
            <div className="flex-content">
                <Field name="Payment Method" sizeClasses="size-lg-12" required>
                    <Field sizeClasses="size-lg-6">
                        <RadioButton
                            name={'paymentType'}
                            value={PAYMENT_IDS.CARD}
                            text="Pay by card"
                            handleInputChange={handleChange}
                            checked={+paymentType === PAYMENT_IDS.CARD}
                            extraDetails={noCards ? 'No cards available' : ''}
                            disabled={noCards}
                        />
                    </Field>
                    <Field sizeClasses="size-lg-6">
                        <RadioButton
                            name={'paymentType'}
                            value={PAYMENT_IDS.INVOICE}
                            text="Pay by invoice"
                            handleInputChange={handleChange}
                            checked={+paymentType === PAYMENT_IDS.INVOICE}
                        />
                    </Field>
                    {+paymentType === PAYMENT_IDS.CARD && !noCards && (
                        <>
                            <Field sizeClasses="size-lg-12">
                                <ActionButton
                                    text="Add new card"
                                    type="submit"
                                    onClick={showAddCard}
                                    icon="plus"
                                    size="small"
                                    ambient="positive"
                                />
                            </Field>
                            <Field sizeClasses="size-lg-12" name="Select Card" required>
                                <Select
                                    required
                                    name="stripeCardID"
                                    options={cards}
                                    omitPlaceholder={!!cards.length}
                                    placeholder={
                                        !cards.length
                                            ? 'Please add a card to use card payments.'
                                            : 'Loading cards...'
                                    }
                                    value={selectedCard}
                                    onChange={handleChange}
                                />
                            </Field>
                        </>
                    )}
                </Field>
            </div>
        </Form>
    );
};

export default PaymentMethod;
