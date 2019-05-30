import React from 'react';
import HeadingSection from 'components/frontEnd/shared/headings/presentational/HeadingSection';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const ContactPageForm = () => (
    <div id="contact-form-content">
        <form className="form">
            <HeadingSection title="Contact Form" />
            <p>
                Please fill in our form and a member of Bolster Systems will be
                in touch.
            </p>
            <div className="row">
                <Field name="Your name" required>
                    <TextInputContainer name="name" required />
                </Field>
            </div>
            <div className="row">
                <Field name="Your email address" required>
                    <TextInputContainer name="email" required />
                </Field>
            </div>
            <div className="row">
                <Field name="Your contact number" required>
                    <TextInputContainer name="contactNumber" required />
                </Field>
            </div>
            <div className="row">
                <Field name="Company name" required>
                    <TextInputContainer name="companyName" required />
                </Field>
            </div>
            <div className="row">
                <Field name="Your enquiry / message" required>
                    <TextAreaContainer name="message" required />
                </Field>
            </div>
            <FrontEndButton type="submit" classes="red">
                Submit
            </FrontEndButton>
        </form>
    </div>
);

export default ContactPageForm;
