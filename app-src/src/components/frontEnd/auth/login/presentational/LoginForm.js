import React from 'react';

import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const LoginForm = ({ formData, handleChange, handleSubmit, handleForgotPassword }) => {
    const { email, password } = formData;
    return (
        <div className="auth-form-wrapper">
            <FrontEndFormHeading title="Login" subtitle="Neque porro quisquam" />
            <Form onSubmit={handleSubmit}>
                <Field name="Email" classes="auth-form-field">
                    <TextInputContainer
                        value={email}
                        name="email"
                        type="email"
                        required
                        handleChange={handleChange}
                        classes="auth-text-input-container"
                    />
                </Field>
                <Field name="Password" classes="auth-form-field">
                    <TextInputContainer
                        value={password}
                        name="password"
                        type="password"
                        required
                        handleChange={handleChange}
                        classes="auth-text-input-container"
                    />
                </Field>
                <Field classes="auth-form-field row right">
                    <FrontEndButton classes="gray right" type="submit">
                        Submit
                    </FrontEndButton>
                </Field>
                <div className="auth-form-field">
                    <div className="forgot-credentials-wrapper">
                        <p onClick={handleForgotPassword}>Forgot your Password?</p>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
