import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AddFloorForm = ({
    handleSubmit,
    handleInputChange,
    name,
    buildingID
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-6">
            <Field name="Floor name">
                <TextInputContainer
                    name="name"
                    value={name}
                    handleChange={handleInputChange}
                    required
                />
            </Field>
        </div>
        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Add Floor
            </button>
            <ButtonContainer to={`/company/buildings/${buildingID}`}>
                Cancel
            </ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddFloorForm;
