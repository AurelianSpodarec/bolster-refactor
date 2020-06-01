import React from 'react';
import { Link } from 'react-router-dom';
import { HuePicker } from 'react-color';

import { VAT_TYPES } from 'constants/companyAdmin/enums';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
// import Select from 'react-select';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Select from 'components/shared/generic/form/presentational/Select';

const RegisterForm = ({
    handleSubmit,
    handleChange,
    handleColourSelect,
    timezoneOptions,
    'User.email': email,
    'User.password': password,
    confirmPassword,
    'User.firstName': firstName,
    'User.lastName': lastName,
    'User.phoneNumber': phoneNumber,
    //company name
    'Company.name': name,
    'Company.addressLine1': addressLine1,
    'Company.addressLine2': addressLine2,
    'Company.town': town,
    'Company.county': county,
    'Company.postcode': postcode,
    'Company.phoneNumber': companyPhoneNumber,
    'Company.fax': fax,
    'Company.vatCode': vatCode,
    'Company.vatType': vatType,
    vatOptions,
    dateFormats,
    'Company.dateFormatID': dateFormatID,
    'Company.timezone': timezone,
    terms,
    error,
    validatePassword,
    validateConfirmPassword
}) => (
        <BlockContainer error={error}>
            <BlockHeading title="Register for bolster systems" />
            <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
                <Field
                    name="First name"
                    sizeClasses="size-lg-4 size-md-12"
                    required
                >
                    <TextInputContainer
                        value={firstName}
                        name={'User.firstName'}
                        placeholder="Please enter your first name"
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <Field name="Last Name" sizeClasses="size-lg-4 size-md-12" required>
                    <TextInputContainer
                        value={lastName}
                        name="User.lastName"
                        placeholder="Please enter your last name"
                        required
                        handleChange={handleChange}
                    />
                </Field>

                <Field name="Email" sizeClasses="size-lg-4 size-md-12" required>
                    <TextInputContainer
                        value={email}
                        name="User.email"
                        type="email"
                        placeholder="Please enter your email"
                        required
                        handleChange={handleChange}
                    />
                </Field>
                <Field name="Password" sizeClasses="size-lg-4 size-md-12" required>
                    <TextInputContainer
                        value={password}
                        name="User.password"
                        type="password"
                        placeholder="Please enter your password"
                        handleChange={handleChange}
                        validate={validatePassword}
                        required
                    />
                </Field>

                <Field
                    name="Confirm password"
                    sizeClasses="size-lg-4 size-md-12"
                    required
                >
                    <TextInputContainer
                        name="confirmPassword"
                        value={confirmPassword}
                        handleChange={handleChange}
                        placeholder="Please confirm your password"
                        type="password"
                        validate={validateConfirmPassword}
                        required
                    />
                </Field>

                <Field name="Telephone" sizeClasses="size-lg-4 size-md-12" required>
                    <TextInputContainer
                        value={phoneNumber}
                        name="User.phoneNumber"
                        placeholder="Please enter your telephone number"
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <Field
                    name="Business name"
                    sizeClasses="size-lg-4 size-md-12"
                    required
                >
                    <TextInputContainer
                        value={name}
                        name="Company.name"
                        placeholder="Please enter your Business name"
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <Field
                    name="Address Line 1"
                    sizeClasses="size-lg-4 size-md-12"
                    required
                >
                    <TextInputContainer
                        value={addressLine1}
                        name="Company.addressLine1"
                        placeholder="Address line 1"
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <Field
                    name="Address Line 2"
                    sizeClasses="size-lg-4 size-md-12"
                >
                    <TextInputContainer
                        value={addressLine2}
                        name="Company.addressLine2"
                        placeholder="Address line 2"
                        handleChange={handleChange}
                    />
                </Field>
                <Field name="Town / City" sizeClasses="size-lg-4 size-md-12" required>
                    <TextInputContainer
                        value={town}
                        name="Company.town"
                        placeholder="Town or City"
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <Field name="County" sizeClasses="size-lg-4 size-md-12" required>
                    <TextInputContainer
                        value={county}
                        name="Company.county"
                        placeholder="County"
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <Field name="Postcode" sizeClasses="size-lg-4 size-md-12" required>
                    <TextInputContainer
                        value={postcode}
                        name="Company.postcode"
                        placeholder="Postcode"
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <Field name="Business Telephone No." sizeClasses="size-lg-4 size-md-12" required>
                    <TextInputContainer
                        value={companyPhoneNumber}
                        name="Company.phoneNumber"
                        placeholder="Telephone No."
                        handleChange={handleChange}
                        required
                    />
                </Field>
                <Field name="Business Fax No." sizeClasses="size-lg-4 size-md-12">
                    <TextInputContainer
                        value={fax}
                        name="Company.fax"
                        placeholder="Fax No."
                        handleChange={handleChange}
                    />
                </Field>

                <Field name="Timezone" required>
                    <Select
                        name="Company.timezone"
                        options={timezoneOptions}
                        value={timezone}
                        onChange={handleChange}
                        omitPlaceholder
                        required
                        search
                    />
                </Field>
                <Field name="Date format" required>
                    <Select
                        name="Company.dateFormatID"
                        options={dateFormats}
                        value={dateFormatID}
                        onChange={handleChange}
                        omitPlaceholder
                        required
                        search
                    />
                </Field>

                <Field name="VAT Type" required>
                    <Select
                        name="Company.vatType"
                        options={vatOptions}
                        value={vatType}
                        onChange={handleChange}
                        omitPlaceholder
                        required
                    />
                </Field>
                {vatType && vatType !== VAT_TYPES.OUTSIDEEU && (
                    <Field
                        name="VAT Code"
                        required={vatType !== VAT_TYPES.OUTSIDEEU}
                    >
                        <TextInputContainer
                            name="Company.vatCode"
                            value={vatCode}
                            handleChange={handleChange}
                            required={vatType !== VAT_TYPES.OUTSIDEEU}
                        />
                    </Field>
                )}
                <Field name="Terms and Conditions" required>
                    <p className="generic-text size-lg-12">
                        To register, please agree to our{' '}
                        <Link to="/auth/terms">Terms and Conditions</Link>.
                </p>
                    <CheckboxContainer
                        checked={terms}
                        handleChange={handleChange}
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
                    <Link to="/auth/login" className="button red">
                        Cancel
                </Link>
                </div>
            </Form>
        </BlockContainer>
    );

export default RegisterForm;
