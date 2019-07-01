import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const sosGenerationForm = ({ handleChange, handleSubmit, description }) => {
    return (
        <Form onSubmit={handleSubmit} className="generic-form">
            <Field name="Enter description" required>
                <TextInputContainer
                    placeholder="Enter a description for the SOS code."
                    name="description"
                    value={description}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <BlockButtonWrapper>
                <button className="button green">Generate SOS Code</button>
            </BlockButtonWrapper>
        </Form>
    );
};

export default sosGenerationForm;
