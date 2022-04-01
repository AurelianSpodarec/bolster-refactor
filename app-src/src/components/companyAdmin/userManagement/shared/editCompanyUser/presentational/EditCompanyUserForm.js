import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';
import LinkButton from '../../../../../shared/generic/button/presentational/LinkButton';
import ButtonWrapper from '../../../../../shared/generic/button/presentational/ButtonWrapper';

const EditCompanyUserForm = ({
    handleSubmit,
    handleInputChange,
    firstName,
    lastName,
    phoneNumber,
    location,
    userID,
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
                <Field name="Phone Number">
                    <TextInputContainer
                        value={phoneNumber}
                        name="phoneNumber"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <ButtonWrapper alignment="right">
                <LinkButton
                    text="Cancel"
                    href={location.pathname.replace(`/${userID}/edit`, '')}
                    size="small"
                    source="secondary"
                />
                <ActionButton type="submit" text="Confirm" icon="check" size="small" />
            </ButtonWrapper>
        </div>
    </Form>
);

export default EditCompanyUserForm;
