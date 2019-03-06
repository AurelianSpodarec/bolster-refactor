import React from 'react';
import { Link } from 'react-router-dom';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';

const Login = ({
    email,
    password,
    validateEmail,
    handleInputChange,
    handleSubmit
}) => (
    <div className="auth size-lg-12">
        <div className="content-container size-lg-12">
            <h1 className="heading heading-1 size-lg-12">Log In</h1>

            <div className="content-area size-lg-12">
                <h3 className="heading heading-3 size-lg-12">
                    Enter your login details
                </h3>
                <Form className="size-lg-12" onSubmit={handleSubmit}>
                    <Field name="Email" sizeClasses="size-lg-4">
                        <TextInputContainer
                            value={email}
                            name="email"
                            placeholder="Please enter your email"
                            required
                            handleChange={handleInputChange}
                            validate={validateEmail}
                        />
                    </Field>

                    <div className="size-lg-1" />

                    <Field name="Password" sizeClasses="size-lg-4">
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
                        <button type="submit">Login</button>

                        <Link className="button" to="/forgot-password">
                            Forgot password
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    </div>
);

export default Login;
