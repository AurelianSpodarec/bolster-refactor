import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const CreateCompanyAdminForm = ({
    email,
    firstName,
    handleSubmit,
    handleInputChange,
    hideModal,
    lastName,
    phoneNumber,
    shouldRestrictPayments,
    shouldRestrictPaymentsAccess,
    isPosting,
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

            <div className="size-lg-6">
                <Field name="Last name" required>
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
                        type="email"
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
                    />
                </Field>
            </div>

            {shouldRestrictPaymentsAccess && (
                <div className="size-lg-6">
                    <Field name="Restrict Payments?">
                        <CheckboxContainer
                            name="shouldRestrictPayments"
                            checked={shouldRestrictPayments}
                            handleChange={handleInputChange}
                        />
                    </Field>
                </div>
            )}
        </div>

        <BlockButtonWrapper>
            <ButtonWrapper alignment="right">
                <ActionButton text="Cancel" source="secondary" size="small" onClick={hideModal} />
                <ActionButton
                    text="Confirm"
                    size="small"
                    type="submit"
                    icon={isPosting ? 'spinner' : 'check'}
                    iconSpin={isPosting}
                    disabled={isPosting}
                />
            </ButtonWrapper>
        </BlockButtonWrapper>
    </Form>
);

export default CreateCompanyAdminForm;
