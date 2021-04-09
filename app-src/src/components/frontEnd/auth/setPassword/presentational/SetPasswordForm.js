import React from 'react';

import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';

const SetPasswordForm = ({ formData, handleChange, handleSubmit, isPosting, postSuccess }) => {
    const { password, confirmPassword } = formData;

    return (
        <div className="auth-form-wrapper login">
            <FrontEndFormHeading title="Set your password" classes="smaller" />
            {postSuccess ? (
                <div className="auth-text-wrapper login-text">
                    <p>
                        Password set successfully. You should now be able to login to the Bolster
                        Systems App.
                    </p>
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
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
                    <Field name="Confirm Password" classes="auth-form-field">
                        <TextInputContainer
                            value={confirmPassword}
                            name="confirmPassword"
                            type="password"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field classes="auth-form-field row right">
                        <FrontEndButton
                            classes={`gray right ${!isPosting ? '' : 'disabled'}`}
                            type="submit"
                            disabled={isPosting}
                        >
                            {!isPosting ? 'Submit' : <LoadingIcon />}
                        </FrontEndButton>
                    </Field>
                </Form>
            )}
        </div>
    );
};

export default SetPasswordForm;
