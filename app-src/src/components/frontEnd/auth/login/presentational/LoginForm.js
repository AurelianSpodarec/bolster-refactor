import React from 'react';

import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';

const LoginForm = ({
    formData,
    handleChange,
    handleSubmit,
    handleForgotPassword,
    isPosting,
    loginText,
    showTwoFactor,
}) => {
    const { email, password, twoFactorCode } = formData;

    return (
        <div className="auth-form-wrapper login">
            <FrontEndFormHeading title="Login" classes="smaller" />
            <Form onSubmit={handleSubmit}>
                <Field name="Email" classes="auth-form-field">
                    <TextInputContainer
                        value={email}
                        name="email"
                        type="email"
                        required
                        handleChange={handleChange}
                        classes="auth-text-input-container"
                    />
                </Field>
                <Field name="Password" classes="auth-form-field">
                    <TextInputContainer
                        value={password}
                        name="password"
                        type="password"
                        required
                        handleChange={handleChange}
                        classes="auth-text-input-container"
                    />
                </Field>
                {showTwoFactor && (
                    <>
                        <Field classes="auth-form-field" name="Two Factor Code">
                            <p className="generic-text">
                                We have sent a code to the Two Factor Authentication phone number in
                                your profile. Please enter it to continue.
                            </p>
                            <TextInputContainer
                                value={twoFactorCode}
                                name="twoFactorCode"
                                required
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                    </>
                )}
                <Field classes="auth-form-field row right">
                    <FrontEndButton
                        classes={`gray right ${!isPosting ? '' : 'disabled'}`}
                        type="submit"
                        disabled={isPosting}
                    >
                        {!isPosting ? 'Submit' : <LoadingIcon />}
                    </FrontEndButton>
                </Field>
                <div className="auth-form-field">
                    <div className="forgot-credentials-wrapper">
                        <p onClick={handleForgotPassword}>Forgot your Password?</p>
                    </div>
                </div>
            </Form>
            <div className="auth-text-wrapper login-text">
                <p>{loginText}</p>
            </div>
        </div>
    );
};

export default LoginForm;
