import React from 'react';
import HeadingSecondary from 'components/frontEnd/shared/headings/presentational/HeadingSecondary';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const RequestDemoForm = () => (
    <div className="generic-form">
        <HeadingSecondary title="Enter your details" />
        <p>
            Please fill in your details for exclusive access to our full working
            demo.
        </p>
        <div className="row">
            <Field name="Your name" required>
                <TextInputContainer
                    name="Name"
                    handleChange={() => {}}
                    required
                />
            </Field>
        </div>
        <div className="row">
            <Field name="Your email address" required>
                <TextInputContainer
                    name="Email"
                    handleChange={() => {}}
                    required
                />
            </Field>
        </div>
        <div className="row">
            <Field name="Your phone number">
                <TextInputContainer
                    name="PhoneNumber"
                    handleChange={() => {}}
                />
            </Field>
        </div>
        <div className="row">
            <Field name="Company name">
                <TextInputContainer
                    name="CompanyName"
                    handleChange={() => {}}
                />
            </Field>
        </div>
        <br />
        <br />
        <span className="required">* required fields</span>
        <FrontEndButton type="submit" classes="black">
            Submit
        </FrontEndButton>
    </div>
);

export default RequestDemoForm;
