import React from 'react';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';

const LoginForm = ({
    handleSubmit,
    handleInputChange,
    handleForgotPassword,
    email,
    password
}) => (
    <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
        <Field name="Email" sizeClasses="size-lg-4" required>
            <TextInputContainer
                value={email}
                name="email"
                type="email"
                placeholder="Please enter your email"
                required
                handleChange={handleInputChange}
            />
        </Field>

        <Field name="Password" sizeClasses="size-lg-4" required>
            <TextInputContainer
                value={password}
                name="password"
                type="password"
                placeholder="Please enter your password"
                handleChange={handleInputChange}
                required
            />
        </Field>

        <div className="button-area size-lg-12">
            {/* ! uncomment when the api is ready */}
            {/* <button
                onClick={handleForgotPassword}
                className="button red"
                type="button"
            >
                Forgot Password
            </button> */}
            <button className="button green" type="submit">
                Login
            </button>
        </div>
    </Form>
);

export default LoginForm;
