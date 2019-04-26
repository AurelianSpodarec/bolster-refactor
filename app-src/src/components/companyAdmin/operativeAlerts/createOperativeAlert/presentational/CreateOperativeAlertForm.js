import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const CreateOperativeAlertForm = ({
    handleSubmit,
    handleInputChange,
    message
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Message">
                    <TextAreaContainer
                        name="message"
                        value={message}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>
        <BlockButtonWrapper>
            <button className="button green">
                <i className="far fa-bell" /> Send Alert
            </button>
            <ButtonContainer to="/company/tools/operative-alerts">
                Cancel
            </ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default CreateOperativeAlertForm;
