import React from 'react';

import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';
import TextInputContainer from '../../form/containers/TextInputContainer';
import CurrencyInput from '../../form/presentational/CurrencyInput';
import FlexModalOuter from './FlexModalOuter';

const AddExpenseToShiftModal = ({
    formData: { name, price },
    handleChange,
    handleSubmit,
    isPosting,
    closeModal,
}) => (
    <FlexModalOuter title="Add Expense">
        <Form
            className="generic-form flex-content-wrapper size-lg-12"
            onSubmit={handleSubmit}
            isPosting={isPosting}
            error={null}
        >
            <div className="flex-content">
                <div className="form-fields-container">
                    <Field name="Name" required>
                        <TextInputContainer name="name" value={name} handleChange={handleChange} />
                    </Field>
                    <Field name="Price" required>
                        <CurrencyInput
                            name="price"
                            value={price}
                            onChange={handleChange}
                            className="fullwidth"
                        />
                    </Field>
                </div>
            </div>

            <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                <ActionButton text="Cancel" onClick={closeModal} source="secondary" size="small" />
                <ActionButton text="Confirm" type="submit" icon="check" size="small" />
            </ButtonWrapper>
        </Form>
    </FlexModalOuter>
);

export default AddExpenseToShiftModal;
