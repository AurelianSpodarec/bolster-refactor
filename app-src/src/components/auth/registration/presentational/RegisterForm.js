import React from 'react';
import Select from 'react-select';

import { VAT_TYPES } from 'constants/companyAdmin/enums';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const RegisterForm = ({
    handleSubmit,
    handleInputChange,
    handleTimezoneChange,
    handleDateFormatChange,
    handleVatTypeChange,
    timezoneOptions,
    timeZone,
    email,
    password,
    firstName,
    lastName,
    //company name
    name,
    phoneNumber,
    addressLine1,
    town,
    postcode,
    vatType,
    vatCode,
    vatOptions,
    dateFormats,
    'company.dateFormatID': dateFormatID,
    terms,
    error
}) => (
    <BlockContainer error={error}>
        <BlockHeading title="Register for bolster systems" />
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <Field name="First name" sizeClasses="size-lg-4">
                <TextInputContainer
                    value={firstName}
                    name="firstName"
                    placeholder="Please enter your email"
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
                    value={phoneNumber}
                    name="phoneNumber"
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
            <Field name="First Line of Address" sizeClasses="size-lg-4">
                <TextInputContainer
                    value={addressLine1}
                    name="addressLine1"
                    placeholder="Address line 1"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Town/City" sizeClasses="size-lg-4">
                <TextInputContainer
                    value={town}
                    name="town"
                    placeholder="Town or City"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Postcode" sizeClasses="size-lg-4">
                <TextInputContainer
                    value={postcode}
                    name="postcode"
                    placeholder="Postcode"
                    handleChange={handleInputChange}
                    required
                />
            </Field>

            <Field name="Timezone">
                <Select
                    options={timezoneOptions}
                    value={timeZone}
                    isSearchable
                    onChange={handleTimezoneChange}
                />
            </Field>
            <Field name="Date format">
                <Select
                    options={dateFormats}
                    value={dateFormatID}
                    isSearchable
                    onChange={handleDateFormatChange}
                />
            </Field>

            <Field name="VAT Type">
                <Select
                    value={vatType}
                    options={vatOptions}
                    onChange={handleVatTypeChange}
                />
            </Field>
            {vatType.value !== VAT_TYPES.OUTSIDEEU && (
                <Field name="VAT Code">
                    <TextInputContainer
                        name="vatCode"
                        value={vatCode}
                        handleChange={handleInputChange}
                        required={vatType.value !== VAT_TYPES.OUTSIDEEU}
                    />
                </Field>
            )}
            <Field name="Terms and Conditions">
                <p className="generic-text size-lg-12">
                    Please tick to agree to our Terms and Conditions
                </p>
                <Checkbox
                    checked={terms}
                    handleChange={handleInputChange}
                    name="terms"
                />
            </Field>
            <div className="button-area size-lg-12">
                <button className="button green" type="submit">
                    Submit
                </button>
            </div>
        </Form>
    </BlockContainer>
);

export default RegisterForm;
