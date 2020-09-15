import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import Error from 'components/shared/generic/form/presentational/Error';
import Form from 'components/shared/generic/form/containers/Form';

const ContactPageForm = ({ form, handleChange, handleSubmit, error }) => (
    <Form id="contact-form-content" className="contact-form" onSubmit={handleSubmit}>
        <Field name="Name" required>
            <TextInputContainer
                name="name"
                value={form.name}
                handleChange={handleChange}
                required
            />
        </Field>
        <Field name="Email" required>
            <TextInputContainer
                name="email"
                value={form.email}
                handleChange={handleChange}
                required
            />
        </Field>
        <Field name="Company" required>
            <TextInputContainer
                name="companyName"
                value={form.companyName}
                handleChange={handleChange}
                required
            />
        </Field>
        <Field name="Contact Number" required>
            <TextInputContainer
                name="contactNumber"
                value={form.contactNumber}
                handleChange={handleChange}
                required
            />
        </Field>
        <FrontEndButton classes="gray right spacing-right" handleClick={handleSubmit} type="submit">
            Submit
        </FrontEndButton>
    </Form>
);

export default ContactPageForm;
