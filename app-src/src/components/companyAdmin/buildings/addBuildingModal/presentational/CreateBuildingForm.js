import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
// import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';

const CreateBuildingForm = ({
    handleSubmit,
    handleInputChange,
    name,
    location,
    handleClose,
    isUsingBolsterLabels
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Building name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Location">
                    <TextInputContainer
                        value={location}
                        name="location"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        {/* {isUsingBolsterLabels && <BolsterLabelExample name={name} />} */}

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Submit
            </button>
            <ButtonContainer handleClick={handleClose}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default CreateBuildingForm;
