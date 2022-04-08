import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { ChromePicker } from 'react-color';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

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
        <ModalOuterContainer>
            <BlockHeading title={`${action} Drawing Zone`} />
            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
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
                <div className="size-lg-12">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={handleCancel}
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

export default DrawingZoneFormModal;
