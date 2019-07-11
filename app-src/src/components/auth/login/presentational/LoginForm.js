import React from 'react';
import { Link } from 'react-router-dom';

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
        <Field name="Email" sizeClasses="size-lg-4 size-md-12" required>
            <TextInputContainer
                value={email}
                name="email"
                type="email"
                placeholder="Please enter your email"
                required
                handleChange={handleInputChange}
            />
        </Field>

        <Field name="Password" sizeClasses="size-lg-4 size-md-12" required>
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
            <p style={{ marginLeft: '10px', float: 'left', color: 'red' }}>
                If you are looking to login to the v2 system{' '}
                <a href="https://v2.bolstersystems.com/auth/Login">
                    click here
                </a>
                .
            </p>

            <button className="button green" type="submit">
                Login
            </button>

            <button
                onClick={handleForgotPassword}
                className="button red"
                type="button"
            >
                Forgot Password
            </button>
            <Link to="/auth/register" className="button yellow">
                Register
            </Link>
        </div>
    </Form>
);

export default LoginForm;
