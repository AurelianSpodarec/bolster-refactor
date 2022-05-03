import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const FloorEditForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    name,
    isUsingBolsterLabels,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className={`size-lg-${isUsingBolsterLabels ? '6' : '12'} size-md-12`}>
                <Field name="floor name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" onClick={hideModal} source="secondary" size="small" />
                <ActionButton text="Confirm" type="submit" icon="check" size="small" />
            </ButtonWrapper>
        </div>
    </Form>
);

export default FloorEditForm;
