import React from 'react';

import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';

const LoginForm = ({ formData, handleChange, handleSubmit }) => {
    const { email, password } = formData;
    return (
        <div className="frontend-form-wrapper">
            <FrontEndFormHeading title="Login" subtitle="Neque porro quisquam" />
            <Form onSubmit={handleSubmit}>
                <Field name="Email" classes="frontend-form-field">
                    <TextInputContainer
                        value={email}
                        name="email"
                        type="email"
                        required
                        handleChange={handleChange}
                        classes="frontend-text-input-container"
                    />
                </Field>
                <Field name="Password" classes="frontend-form-field">
                    <TextInputContainer
                        value={password}
                        name="password"
                        type="password"
                        required
                        handleChange={handleChange}
                        classes="frontend-text-input-container"
                    />
                </Field>
            </Form>
        </div>
    );
};

export default LoginForm;
