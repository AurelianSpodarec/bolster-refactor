import React from 'react';

import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import FrontEndModalOuterContainer from 'components/frontEnd/shared/modals/containers/FrontEndModalOuterContainer';

const ForgotPasswordModal = ({ hideModal, handleChange, handleSubmit, email }) => {
    return (
        <FrontEndModalOuterContainer>
            <div className="auth-form-wrapper modal">
                <FrontEndFormHeading
                    title="Forgot Password"
                    subtitle="Please enter the email that you use to log in."
                />
                <Form onSubmit={handleSubmit}>
                    <Field name="Email Address" classes="auth-form-field" required>
                        <TextInputContainer
                            value={email}
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>

                    <Field classes="auth-form-field row modal">
                        <FrontEndButton classes="red modal" type="button" handleClick={hideModal}>
                            Cancel
                        </FrontEndButton>
                        <FrontEndButton classes="gray modal" type="submit">
                            Submit
                        </FrontEndButton>
                    </Field>
                </Form>
            </div>
        </FrontEndModalOuterContainer>
    );
};

export default ForgotPasswordModal;
