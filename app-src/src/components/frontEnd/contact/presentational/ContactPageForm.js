import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import Error from 'components/shared/generic/form/presentational/Error';

const ContactPageForm = ({
    name,
    email,
    contactNumber,
    companyName,
    handleChange,
    handleSubmit,
    sent,
    error,
}) => (
    <div id="contact-form-content" className="contact-form">
        <form className="form">
            <>
                {sent ? (
                    <p>Thanks! A member of our team will be in touch.</p>
                ) : (
                    <>
                        <div className="row">
                            <Field name="Name" required>
                                <TextInputContainer
                                    name="name"
                                    required
                                    value={name}
                                    handleChange={handleChange}
                                />
                            </Field>
                        </div>
                        <div className="row">
                            <Field name="Email" required>
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
                            <Field name="Company">
                                <TextInputContainer
                                    name="companyName"
                                    required
                                    value={companyName}
                                    handleChange={handleChange}
                                />
                            </Field>
                        </div>
                        <div className="row">
                            <Field name="Contact Number" required>
                                <TextInputContainer
                                    name="contactNumber"
                                    required
                                    value={contactNumber}
                                    handleChange={handleChange}
                                />
                            </Field>
                        </div>
                        {error && (
                            <Error>
                                Something went wrong submitting your request, please try again
                                later.
                            </Error>
                        )}
                        <FrontEndButton
                            type="submit"
                            classes="gray right spacing-right"
                            handleClick={handleSubmit}
                        >
                            Submit
                        </FrontEndButton>
                    </>
                )}
            </>
        </form>
    </div>
);

export default ContactPageForm;
