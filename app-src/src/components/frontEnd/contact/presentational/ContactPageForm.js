import React from 'react';

import ReCaptcha from 'components/shared/generic/form/presentational/ReCaptcha';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import Form from 'components/shared/generic/form/containers/Form';
import Error from 'components/shared/generic/form/presentational/Error';

const ContactPageForm = ({ form, handleChange, handleSubmit, error }) => {
    return error ? (
        <Error>{error}</Error>
    ) : (
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
            <Field>
                <ReCaptcha
                    name="recaptchaToken"
                    value={form.recaptchaToken}
                    onChange={handleChange}
                    required
                />
            </Field>
            <FrontEndButton classes="gray right spacing-right-sm" type="submit">
                Submit
            </FrontEndButton>
        </Form>
    );
};

export default ContactPageForm;
