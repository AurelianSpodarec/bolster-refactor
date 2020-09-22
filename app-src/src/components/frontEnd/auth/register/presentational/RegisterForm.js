import React from 'react';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';

const RegisterForm = ({ handleSubmit, handleChange }) => {
    return (
        <div className="auth-form-wrapper register">
            <FrontEndFormHeading title="Register" subtitle="User Details" />
            <Form onSubmit={handleSubmit}>
                <Field name="First Name" classes="auth-form-field">
                    <TextInputContainer
                        value={''}
                        name="firstName"
                        type="firstName"
                        required
                        handleChange={handleChange}
                        classes="auth-text-input-container"
                    />
                </Field>
                <Field classes="auth-form-field right">
                    <FrontEndButton classes="gray" type="submit">
                        Submit
                    </FrontEndButton>
                </Field>
            </Form>
        </div>
    );
};

export default RegisterForm;
