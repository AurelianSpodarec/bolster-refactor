import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const CreateOperativeForm = ({
    handleSubmit,
    handleInputChange,
    validatePassword,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="First Name">
                    <TextInputContainer
                        name="firstName"
                        value={firstName}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Last Name">
                    <TextInputContainer
                        value={lastName}
                        name="lastName"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Email Address">
                    <TextInputContainer
                        value={email}
                        name="email"
                        type="email"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Phone Number">
                    <TextInputContainer
                        value={phoneNumber}
                        name="phoneNumber"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Password">
                    <TextInputContainer
                        value={password}
                        name="password"
                        handleChange={handleInputChange}
                        type="password"
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Confirm Password">
                    <TextInputContainer
                        value={confirmPassword}
                        name="confirmPassword"
                        validate={validatePassword}
                        handleChange={handleInputChange}
                        type="password"
                        required
                    />
                </Field>
            </div>
        </div>

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Invite Operative
            </button>
            <Link to="/company/users-management/operatives" className="button">
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default CreateOperativeForm;
