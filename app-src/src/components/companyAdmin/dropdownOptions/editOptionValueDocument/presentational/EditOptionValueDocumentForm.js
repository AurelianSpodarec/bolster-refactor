import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const EditOptionValueDocumentForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    buttonText,
    name,
    validateName,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        validate={validateName}
                        required
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" onClick={hideModal} source="secondary" size="small" />
                <ActionButton text={buttonText} type="submit" icon="check" size="small" />
            </ButtonWrapper>
        </div>
    </Form>
);
export default EditOptionValueDocumentForm;
