import React from 'react';
import HeadingSection from 'components/frontEnd/shared/headings/presentational/HeadingSection';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const ContactPageForm = ({
    name,
    email,
    number,
    companyName,
    message,
    handleChange,
    handleSubmit
}) => (
    <div id="contact-form-content">
        <form className="form">
            <HeadingSection title="Contact Form" />
            <p>
                Please fill in our form and a member of Bolster Systems will be
                in touch.
            </p>
            <div className="row">
                <Field name="Your name" required>
                    <TextInputContainer
                        name="name"
                        required
                        value={name}
                        handleChange={handleChange}
                    />
                </Field>
            </div>
            <div className="row">
                <Field name="Your email address" required>
                    <TextInputContainer
                        name="email"
                        required
                        value={email}
                        type="email"
                        handleChange={handleChange}
                    />
                </Field>
            </div>
            <div className="row">
                <Field name="Your contact number" required>
                    <TextInputContainer
                        name="number"
                        required
                        value={number}
                        handleChange={handleChange}
                    />
                </Field>
            </div>
            <div className="row">
                <Field name="Company name">
                    <TextInputContainer
                        name="companyName"
                        required
                        value={companyName}
                        handleChange={handleChange}
                    />
                </Field>
            </div>
            <div className="row">
                <Field name="Your enquiry / message" required>
                    <TextAreaContainer
                        name="message"
                        required
                        value={message}
                        handleChange={handleChange}
                    />
                </Field>
            </div>
            <FrontEndButton
                type="submit"
                classes="red"
                handleClick={handleSubmit}
            >
                Submit
            </FrontEndButton>
        </form>
    </div>
);

export default ContactPageForm;
