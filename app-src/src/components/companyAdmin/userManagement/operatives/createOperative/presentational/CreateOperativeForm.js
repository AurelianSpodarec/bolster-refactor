import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const CreateOperativeForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    validatePassword,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    validateConfirmPassword
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="First Name" required>
                    <TextInputContainer
                        name="firstName"
                        value={firstName}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6">
                <Field name="Last Name" required>
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
                <Field name="Email Address" required>
                    <TextInputContainer
                        value={email}
                        name="email"
                        type="email"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Phone Number" required>
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
                        handleChange={handleInputChange}
                        type="password"
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
                        handleChange={handleInputChange}
                        type="password"
                        validate={validateConfirmPassword}
                        required
                    />
                </Field>
            </div>
        </div>

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Attach Operative
            </button>
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default CreateOperativeForm;
