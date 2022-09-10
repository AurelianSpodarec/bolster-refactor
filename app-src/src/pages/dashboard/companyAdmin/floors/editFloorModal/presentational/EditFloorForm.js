import React from 'react';

import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const FloorEditForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    name,
    isUsingBolsterLabels,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
        <div className="flex-content">
            <div className="form-fields-container size-lg-12">
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
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            <ActionButton text="Cancel" onClick={hideModal} source="secondary" size="small" />
            <ActionButton text="Confirm" type="submit" icon="check" size="small" />
        </ButtonWrapper>
    </Form>
);

export default FloorEditForm;
