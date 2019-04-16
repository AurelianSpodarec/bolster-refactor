import React from 'react';
import { Link } from 'react-router-dom';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';

const LoginForm = ({ handleSubmit, handleInputChange, email, password }) => (
    <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
        <Field name="Email" sizeClasses="size-lg-4">
            <TextInputContainer
                value={email}
                name="email"
                type="email"
                placeholder="Please enter your email"
                required
                handleChange={handleInputChange}
            />
        </Field>

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
            <button className="button" type="submit">
                Login
            </button>


        </div>
    </Form>
);

export default LoginForm;
