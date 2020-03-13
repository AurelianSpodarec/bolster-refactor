import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { HuePicker } from 'react-color';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AddDrawingsZoneModal = ({
    name,
    handleNameChange,
    colorHex,
    handleColorChange,
    handleSubmit,
    hideModal
}) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title={'Create Drawings'} />
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
                        <HuePicker
                            color={colorHex}
                            onChangeComplete={handleColorChange}
                        />
                    </div>
                </Field>
                <BlockButtonWrapper>
                    <button type="submit" className="button blue left">
                        Submit
                    </button>
                    <button type="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default AddDrawingsZoneModal;
