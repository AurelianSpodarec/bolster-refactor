import React from 'react';
import { ChromePicker } from 'react-color';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const DrawingZoneFormModal = ({
    action = 'Add',
    name,
    handleNameChange,
    colorHex,
    handleColorChange,
    handleSubmit,
    handleCancel,
}) => {
    return (
        <FlexModalOuter title={`${action} Drawing Zone`}>
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container size-lg-12">
                        <Field name="Name" required>
                            <TextInputContainer
                                required
                                name="name"
                                value={name}
                                handleChange={handleNameChange}
                            />
                        </Field>
                        <Field name="Change Colour Scheme" required>
                            <div className="size-lg-12">
                                <ChromePicker
                                    color={colorHex}
                                    onChangeComplete={handleColorChange}
                                    disableAlpha
                                />
                            </div>
                        </Field>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Cancel"
                        onClick={handleCancel}
                        source="secondary"
                        size="small"
                    />
                    <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default DrawingZoneFormModal;
