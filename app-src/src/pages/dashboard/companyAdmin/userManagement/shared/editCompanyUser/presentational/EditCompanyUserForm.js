import React from 'react';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import LinkButton from 'components_DEPRECATED/shared/generic/button/presentational/LinkButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import CheckboxContainer from 'components_DEPRECATED/shared/generic/form/containers/CheckboxContainer';

const EditCompanyUserForm = ({
    handleSubmit,
    handleInputChange,
    firstName,
    lastName,
    phoneNumber,
    location,
    userID,
    canSetAdminPlus,
    shouldHaveAdminPlus,
    showAdminPlusEdit,
}) => {
    return (
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

                {showAdminPlusEdit && canSetAdminPlus && (
                    <div className="size-lg-6">
                        <Field name="Admin Plus?">
                            <CheckboxContainer
                                name="shouldHaveAdminPlus"
                                checked={shouldHaveAdminPlus}
                                handleChange={handleInputChange}
                            />
                        </Field>
                    </div>
                )}
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
};
export default EditCompanyUserForm;
