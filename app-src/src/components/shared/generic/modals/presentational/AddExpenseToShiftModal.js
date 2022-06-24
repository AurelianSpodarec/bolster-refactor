import React from 'react';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import CheckboxContainer from '../../form/containers/CheckboxContainer';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';

import ModalOuterContainer from '../containers/ModalOuterContainer';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';
import TextInputContainer from '../../form/containers/TextInputContainer';
import CurrencyInput from '../../form/presentational/CurrencyInput';

const AddExpenseToShiftModal = ({
    formData: { name, price },
    handleChange,
    handleSubmit,
    isPosting,
    closeModal,
}) => {
    return (
        <ModalOuterContainer size="small">
            <BlockHeading title="Add Expense" />

            <Form
                className="generic-form"
                onSubmit={handleSubmit}
                isPosting={isPosting}
                error={null}
            >
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

                <div className="size-lg-12">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={closeModal}
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

export default AddExpenseToShiftModal;
