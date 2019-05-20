import React from 'react';

import { VAT_TYPES } from 'constants/companyAdmin/enums';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Select from 'react-select';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const RegisterForm = ({
    handleSubmit,
    handleInputChange,
    timezoneOptions,
    'User.email': email,
    'User.password': password,
    confirmPassword,
    'User.firstName': firstName,
    'User.lastName': lastName,
    //company name
    'Company.name': name,
    'Company.phoneNumber': phoneNumber,
    'Company.addressLine1': addressLine1,
    'Company.town': town,
    'Company.postcode': postcode,
    'Company.vatCode': vatCode,
    'Company.vatType': vatType,
    vatOptions,
    dateFormats,
    'Company.dateFormatID': dateFormatID,
    'Company.timezone': timezone,
    terms,
    error,
    validatePassword,
    validateConfirmPassword,
    handleDropDown
}) => (
    <BlockContainer error={error}>
        <BlockHeading title="Register for bolster systems" />
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <Field name="First name" sizeClasses="size-lg-4" required>
                <TextInputContainer
                    value={firstName}
                    name={'User.firstName'}
                    placeholder="Please enter your first name"
                    handleChange={handleInputChange}
                />
            </Field>
            <Field name="Last Name" sizeClasses="size-lg-4" required>
                <TextInputContainer
                    value={lastName}
                    name="User.lastName"
                    placeholder="Please enter your last name"
                    required
                    handleChange={handleInputChange}
                />
            </Field>

            <Field name="Email" sizeClasses="size-lg-4" required>
                <TextInputContainer
                    value={email}
                    name="User.email"
                    type="email"
                    placeholder="Please enter your email"
                    required
                    handleChange={handleInputChange}
                />
            </Field>
            <Field name="Password" sizeClasses="size-lg-4" required>
                <TextInputContainer
                    value={password}
                    name="User.password"
                    type="password"
                    placeholder="Please enter your password"
                    handleChange={handleInputChange}
                    validate={validatePassword}
                    required
                />
            </Field>

            <Field name="Confirm password" sizeClasses="size-lg-4" required>
                <TextInputContainer
                    name="confirmPassword"
                    value={confirmPassword}
                    handleChange={handleInputChange}
                    placeholder="Please confirm your password"
                    type="password"
                    validate={validateConfirmPassword}
                    required
                />
            </Field>

            <Field name="Telephone" sizeClasses="size-lg-4" required>
                <TextInputContainer
                    value={phoneNumber}
                    name="Company.phoneNumber"
                    placeholder="Please enter your telephone number"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Business name" sizeClasses="size-lg-4" required>
                <TextInputContainer
                    value={name}
                    name="Company.name"
                    placeholder="Please enter your Business name"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field
                name="First Line of Address"
                sizeClasses="size-lg-4"
                required
            >
                <TextInputContainer
                    value={addressLine1}
                    name="Company.addressLine1"
                    placeholder="Address line 1"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Town/City" sizeClasses="size-lg-4" required>
                <TextInputContainer
                    value={town}
                    name="Company.town"
                    placeholder="Town or City"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Postcode" sizeClasses="size-lg-4" required>
                <TextInputContainer
                    value={postcode}
                    name="Company.postcode"
                    placeholder="Postcode"
                    handleChange={handleInputChange}
                    required
                />
            </Field>

            <Field name="Timezone" required>
                <Select
                    options={timezoneOptions}
                    value={timezone}
                    isSearchable
                    onChange={handleDropDown}
                    name="Company.timezone"
                    required
                />
            </Field>
            <Field name="Date format" required>
                <Select
                    options={dateFormats}
                    value={dateFormatID}
                    isSearchable
                    onChange={handleDropDown}
                    name="Company.dateFormatID"
                    required
                />
            </Field>

            <Field name="VAT Type" required>
                <Select
                    options={vatOptions}
                    value={vatType}
                    isSearchable
                    onChange={handleDropDown}
                    name="Company.vatType"
                    required
                />
            </Field>
            {vatType.value !== VAT_TYPES.OUTSIDEEU && (
                <Field
                    name="VAT Code"
                    required={vatType !== VAT_TYPES.OUTSIDEEU}
                >
                    <TextInputContainer
                        name="Company.vatCode"
                        value={vatCode}
                        handleChange={handleInputChange}
                        required={vatType.value !== VAT_TYPES.OUTSIDEEU}
                    />
                </Field>
            )}
            <Field name="Terms and Conditions" required>
                <p className="generic-text size-lg-12">
                    To register, please agree to our Terms and Conditions.
                </p>
                <CheckboxContainer
                    checked={terms}
                    handleChange={handleInputChange}
                    name="terms"
                    required
                />
            </Field>
            <div className="button-area size-lg-12">
                {terms ? (
                    <button className="button green" type="submit">
                        Submit
                    </button>
                ) : (
                    <button
                        className="button green disabled"
                        disabled
                        type="submit"
                    >
                        Submit
                    </button>
                )}
            </div>
        </Form>
    </BlockContainer>
);

export default RegisterForm;
