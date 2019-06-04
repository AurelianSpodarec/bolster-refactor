import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const CreateCompanyAdminForm = ({
    confirmPassword,
    email,
    firstName,
    handleSubmit,
    handleInputChange,
    hideModal,
    lastName,
    phoneNumber,
    password,
    validatePassword,
    validateConfirmPassword
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="First name" required>
                    <TextInputContainer
                        name="firstName"
                        value={firstName}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6" required>
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
                <Field name="Email address" required>
                    <TextInputContainer
                        value={email}
                        name="email"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Phone number" required>
                    <TextInputContainer
                        value={phoneNumber}
                        name="phoneNumber"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Password" required>
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
                <Field name="Confirm Password" required>
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
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default CreateCompanyAdminForm;
