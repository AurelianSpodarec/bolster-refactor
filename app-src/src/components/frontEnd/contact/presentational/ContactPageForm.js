import React from 'react';

import ReCaptcha from 'components/shared/generic/form/presentational/ReCaptcha';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import Form from 'components/shared/generic/form/containers/Form';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';

const ContactPageForm = ({ form, handleChange, handleSubmit, sent, isPosting }) => {
    if (sent) {
        return (
            <div className="sent-message-wrapper">
                <p>Thank you, we will be in touch shortly.</p>
            </div>
        );
    }

    return (
        <Form id="contact-form-content" className="contact-form" onSubmit={handleSubmit}>
            <Field name="Name">
                <TextInputContainer
                    name="name"
                    value={form.name}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <Field name="Email">
                <TextInputContainer
                    name="email"
                    value={form.email}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <Field name="Company">
                <TextInputContainer
                    name="companyName"
                    value={form.companyName}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <Field name="Contact Number">
                <TextInputContainer
                    name="contactNumber"
                    value={form.contactNumber}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <Field classes="submit-wrapper">
                <Field>
                    <ReCaptcha
                        name="reCaptchaToken"
                        value={form.reCaptchaToken}
                        onChange={handleChange}
                        required
                    />
                </Field>
                <FrontEndButton
                    classes={`gray ${isPosting ? 'disabled' : ''}`}
                    type="submit"
                    disabled={isPosting}
                >
                    {isPosting ? <LoadingIcon /> : 'Submit'}
                </FrontEndButton>
            </Field>
        </Form>
    );
};

export default ContactPageForm;
