import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
// import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';

const AddFloorForm = ({
    handleSubmit,
    handleClose,
    handleInputChange,
    name,
    isUsingBolsterLabels
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-6 size-md-12">
            <Field name="Floor name" required>
                <TextInputContainer
                    name="name"
                    value={name}
                    handleChange={handleInputChange}
                    required
                />
            </Field>
        </div>
        {/* {isUsingBolsterLabels && <BolsterLabelExample name={name} />} */}

        <BlockButtonWrapper>
            <button className="button green">Submit</button>
            <ButtonContainer handleClick={handleClose}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddFloorForm;
