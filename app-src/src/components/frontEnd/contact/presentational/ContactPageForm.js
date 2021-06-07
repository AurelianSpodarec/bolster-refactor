import React from 'react';

import ReCaptcha from 'components/shared/generic/form/presentational/ReCaptcha';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import Form from 'components/shared/generic/form/containers/Form';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import ContactInfo from './ContactInfo';

const ContactPageForm = ({ form, handleChange, handleSubmit, sent, isPosting }) => {
    if (!sent) {
        return (
            <div className="auth-form-wrapper contact">
                <FrontEndFormHeading
                    title="Thank you!"
                    subtitle="We have received your contact request and a member of the Bolster Systems team will be in touch."
                />
            </div>
        );
    }

    // return (
    //     <div className="auth-form-wrapper contact">
    //         <div className="auth-text-wrapper">
    //             <div className="auth-heading">
    //                 <heading>
    //                     <h1>Contact</h1>
    //                 </heading>
    //             </div>
    //             <p>
    //                 If you would like any further information on our system or to arrange a demo,
    //                 please fill in the contact form and a member of the Bolster Systems team will
    //                 get back to you.
    //             </p>
    //         </div>
    //         <Form id="contact-form-content" className="contact-form" onSubmit={handleSubmit}>
    //             <Field name="Name" classes="auth-form-field" required>
    //                 <TextInputContainer
    //                     name="name"
    //                     value={form.name}
    //                     handleChange={handleChange}
    //                     classes="auth-text-input-container"
    //                     required
    //                 />
    //             </Field>
    //             <Field name="Email" classes="auth-form-field" required>
    //                 <TextInputContainer
    //                     name="email"
    //                     value={form.email}
    //                     handleChange={handleChange}
    //                     classes="auth-text-input-container"
    //                     required
    //                 />
    //             </Field>
    //             <Field name="Company" classes="auth-form-field" required>
    //                 <TextInputContainer
    //                     name="companyName"
    //                     value={form.companyName}
    //                     handleChange={handleChange}
    //                     classes="auth-text-input-container"
    //                     required
    //                 />
    //             </Field>
    //             <Field name="Contact Number" classes="auth-form-field" required>
    //                 <TextInputContainer
    //                     name="contactNumber"
    //                     value={form.contactNumber}
    //                     handleChange={handleChange}
    //                     classes="auth-text-input-container"
    //                     required
    //                 />
    //             </Field>
    //             <Field classes="submit-wrapper auth-form-field row between">
    //                 <div>
    //                     <ReCaptcha
    //                         name="reCaptchaToken"
    //                         value={form.reCaptchaToken}
    //                         onChange={handleChange}
    //                         required
    //                     />
    //                 </div>

    //                 <FrontEndButton
    //                     classes={`gray ${isPosting ? 'disabled' : ''}`}
    //                     type="submit"
    //                     disabled={isPosting}
    //                 >
    //                     {isPosting ? <LoadingIcon /> : 'Submit'}
    //                 </FrontEndButton>
    //             </Field>
    //         </Form>
    //         <ContactInfo />
    //     </div>
    // );
};

export default ContactPageForm;
