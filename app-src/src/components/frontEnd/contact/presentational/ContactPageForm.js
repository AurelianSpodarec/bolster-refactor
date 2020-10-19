import React from 'react';

import ReCaptcha from 'components/shared/generic/form/presentational/ReCaptcha';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import Form from 'components/shared/generic/form/containers/Form';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';

const ContactPageForm = ({ form, handleChange, handleSubmit, sent, isPosting }) => {
    if (sent) {
        return (
            <div className="auth-form-wrapper contact">
                <FrontEndFormHeading title="Success" subtitle='Thank you! We will be in touch shortly.' />
            </div>
        );
    }

    return (
        <div className="auth-form-wrapper contact">
            <FrontEndFormHeading title="Enter your details" />
            <Form id="contact-form-content" className="contact-form" onSubmit={handleSubmit}>
                <Field name="Name" classes="auth-form-field" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        classes="auth-text-input-container"
                        required
                    />
                </Field>
                <Field name="Email" classes="auth-form-field" required>
                    <TextInputContainer
                        name="email"
                        value={form.email}
                        handleChange={handleChange}
                        classes="auth-text-input-container"
                        required
                    />
                </Field>
                <Field name="Company" classes="auth-form-field" required>
                    <TextInputContainer
                        name="companyName"
                        value={form.companyName}
                        handleChange={handleChange}
                        classes="auth-text-input-container"
                        required
                    />
                </Field>
                <Field name="Contact Number" classes="auth-form-field" required>
                    <TextInputContainer
                        name="contactNumber"
                        value={form.contactNumber}
                        handleChange={handleChange}
                        classes="auth-text-input-container"
                        required
                    />
                </Field>
                <Field classes="submit-wrapper auth-form-field row between">
                    <div>
                        <ReCaptcha
                            name="reCaptchaToken"
                            value={form.reCaptchaToken}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <FrontEndButton
                        classes={`gray ${isPosting ? 'disabled' : ''}`}
                        type="submit"
                        disabled={isPosting}
                    >
                        {isPosting ? <LoadingIcon /> : 'Submit'}
                    </FrontEndButton>
                </Field>
            </Form>
        </div>
        
    );
};

export default ContactPageForm;
