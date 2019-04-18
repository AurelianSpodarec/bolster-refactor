import React from 'react';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const RegisterForm = ({
    handleSubmit,
    handleInputChange,
    timeZoneOptions,
    selectedTimeZone,
    email,
    password,
    firstName,
    lastName,
    //company name
    name,
    telephone,
    businessName,
    culture,
    addressLine1,
    town,
    postcode,
    VATType,
    VATCode
}) => (
    <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
        <Field name="First name" sizeClasses="size-lg-4">
            <TextInputContainer
                value={firstName}
                name="firstName"
                placeholder="Please enter your email"
                required
                handleChange={handleInputChange}
            />
        </Field>
        <Field name="Last Name" sizeClasses="size-lg-4">
            <TextInputContainer
                value={lastName}
                name="lastName"
                placeholder="Please enter your last name"
                required
                handleChange={handleInputChange}
            />
        </Field>

        <Field name="Email" sizeClasses="size-lg-4">
            <TextInputContainer
                value={email}
                name="email"
                type="email"
                placeholder="Please enter your email"
                required
                handleChange={handleInputChange}
            />
        </Field>
        <Field name="Password" sizeClasses="size-lg-4">
            <TextInputContainer
                value={password}
                name="password"
                type="password"
                placeholder="Please enter your password"
                handleChange={handleInputChange}
                required
            />
        </Field>
        <Field name="Telephone" sizeClasses="size-lg-4">
            <TextInputContainer
                value={telephone}
                name="telephone"
                placeholder="Please enter your telephone number"
                handleChange={handleInputChange}
                required
            />
        </Field>
        <div className="size-lg-12" />
        <Field name="Business name" sizeClasses="size-lg-4">
            <TextInputContainer
                value={name}
                name="name"
                placeholder="Please enter your Business name"
                handleChange={handleInputChange}
                required
            />
        </Field>
        <Field name="Time zones">
            <DropdownContainer
                required
                name="TimeZone"
                options={timeZoneOptions}
                selectedOption={selectedTimeZone}
                handleChange={handleInputChange}
            />
        </Field>

        <div className="button-area size-lg-12">
            <button className="button" type="submit">
                Login
            </button>
        </div>
    </Form>
);

export default RegisterForm;
