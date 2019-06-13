import React from 'react';
import HeadingSecondary from 'components/frontEnd/shared/headings/presentational/HeadingSecondary';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const RequestDemoForm = ({
    name,
    email,
    number,
    companyName,
    handleChange,
    handleSubmit
}) => (
    <div className="generic-form">
        <HeadingSecondary title="Enter your details" />
        <p>
            Please fill in your details for exclusive access to our full working
            demo.
        </p>
        <div className="row">
            <Field name="Your name" required>
                <TextInputContainer
                    name="name"
                    value={name}
                    handleChange={handleChange}
                    required
                />
            </Field>
        </div>
        <div className="row">
            <Field name="Your email address" required>
                <TextInputContainer
                    name="email"
                    handleChange={handleChange}
                    type="email"
                    value={email}
                    required
                />
            </Field>
        </div>
        <div className="row">
            <Field name="Your phone number">
                <TextInputContainer
                    name="number"
                    handleChange={handleChange}
                    value={number}
                />
            </Field>
        </div>
        <div className="row">
            <Field name="Company name">
                <TextInputContainer
                    name="companyName"
                    handleChange={handleChange}
                    value={companyName}
                />
            </Field>
        </div>
        <br />
        <br />
        <span className="required">* required fields</span>
        <FrontEndButton
            handleSubmit={handleSubmit}
            type="submit"
            classes="black"
        >
            Submit
        </FrontEndButton>
    </div>
);

export default RequestDemoForm;
