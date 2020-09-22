import React from 'react';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';

const RegisterPageContainer = ({ activePage, handleChange, handleSubmit }) => {
    if (activePage === 2) {
        return (
            <div className="auth-form-wrapper wide">
                <FrontEndFormHeading title="Register" subtitle="Company Details" />
                <Form onSubmit={handleSubmit}>
                    <div className="register-input-wrapper">
                        <Field name="Name" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="name"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="Telephone" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="telephone"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="Fax" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="fax"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="Timezone" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="timezone"
                                type="time"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="Date Format" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="dateFormat"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="VAT Type" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="vatType"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="VAT Code" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="vatCode"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                    </div>
                    <Field classes="auth-form-field buttons wide row">
                        <FrontEndButton classes="gray left" type="button">
                            Back
                        </FrontEndButton>
                        <FrontEndButton classes="gray right" type="button">
                            Next
                        </FrontEndButton>
                    </Field>
                </Form>
            </div>
        );
    }
    if (activePage === 3) {
        return (
            <div className="auth-form-wrapper wide">
                <FrontEndFormHeading title="Register" subtitle="Company Address" />
                <Form onSubmit={handleSubmit}>
                    <div className="register-input-wrapper">
                        <Field name="Name" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="name"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="Telephone" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="telephone"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="Fax" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="fax"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="Timezone" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="timezone"
                                type="time"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="Date Format" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="dateFormat"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="VAT Type" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="vatType"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field name="VAT Code" classes="auth-form-field wide">
                            <TextInputContainer
                                value={''}
                                name="vatCode"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                    </div>
                    <Field classes="auth-form-field buttons wide row">
                        <FrontEndButton classes="gray left" type="button">
                            Back
                        </FrontEndButton>
                        <FrontEndButton classes="gray right" type="button">
                            Next
                        </FrontEndButton>
                    </Field>
                </Form>
            </div>
        );
    }
    return (
        <div className="auth-form-wrapper wide">
            <FrontEndFormHeading title="Register" subtitle="User Details" />
            <Form onSubmit={handleSubmit}>
                <div className="register-input-wrapper">
                    <Field name="First Name" classes="auth-form-field wide">
                        <TextInputContainer
                            value={''}
                            name="firstName"
                            type="firstName"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field name="Last Name" classes="auth-form-field wide">
                        <TextInputContainer
                            value={''}
                            name="lastName"
                            type="lastName"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field name="Phone Number" classes="auth-form-field wide">
                        <TextInputContainer
                            value={''}
                            name="phoneNumber"
                            type="phoneNumber"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field name="Email" classes="auth-form-field wide">
                        <TextInputContainer
                            value={''}
                            name="email"
                            type="email"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field name="Password" classes="auth-form-field wide">
                        <TextInputContainer
                            value={''}
                            name="password"
                            type="password"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field name="Confirm Password" classes="auth-form-field wide">
                        <TextInputContainer
                            value={''}
                            name="confirmPassword"
                            type="confirmPassword"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                </div>
                <Field classes="auth-form-field wide">
                    <FrontEndButton classes="gray right" type="button">
                        Next
                    </FrontEndButton>
                </Field>
            </Form>
        </div>
    );
};

export default RegisterPageContainer;
