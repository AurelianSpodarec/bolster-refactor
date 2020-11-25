import React from 'react';
import { withRouter } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';

const EditTextSettingsForm = ({
    loginText,
    registerText,
    handleChange,
    handleSubmit,
    location,
    isPosting,
}) => {
    return (
        <Form className="generic-form ize-lg-12" onSubmit={handleSubmit}>
            <div className="size-lg-12">
                <Field name="Login page text" sizeClasses="size-lg-6 size-md-12">
                    <TextAreaContainer
                        value={loginText}
                        name={'loginText'}
                        handleChange={handleChange}
                        charLimit="500"
                    />
                </Field>
                <Field name="Register page text" sizeClasses="size-lg-6 size-md-12">
                    <TextAreaContainer
                        value={registerText}
                        name={'registerText'}
                        handleChange={handleChange}
                        charLimit="500"
                    />
                </Field>
            </div>
            <BlockButtonWrapper>
                <button onClick={handleSubmit} disabled={isPosting} className="button green">
                    Confirm
                </button>
                <ButtonContainer to={location.pathname.replace('/edit-settings', '')}>
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    );
};

export default withRouter(EditTextSettingsForm);
