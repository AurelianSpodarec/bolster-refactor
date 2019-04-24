import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const CreateCompanyAdminForm = ({
    handleSubmit,
    handleInputChange,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    validatePassword,
    validateConfirmPassword
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="First name">
                    <TextInputContainer
                        name="firstName"
                        value={firstName}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Last name">
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
                <Field name="E-mail address">
                    <TextInputContainer
                        value={email}
                        name="email"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Phone number">
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
                        type="password"
                        handleChange={handleInputChange}
                        validate={validatePassword}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Confirm Password">
                    <TextInputContainer
                        value={confirmPassword}
                        name="confirmPassword"
                        type="password"
                        handleChange={handleInputChange}
                        validate={validateConfirmPassword}
                        required
                    />
                </Field>
            </div>
        </div>

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Create Company Admin
            </button>
            <a
                className="button"
                href="/company/users-management/company-admins"
            >
                Cancel
            </a>
        </BlockButtonWrapper>
    </Form>
);

export default CreateCompanyAdminForm;
