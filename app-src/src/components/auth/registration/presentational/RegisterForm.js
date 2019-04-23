import React from 'react';
import Select from 'react-select';

import { VAT_TYPES } from 'constants/companyAdmin/enums';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';

const RegisterForm = ({
    handleSubmit,
    handleInputChange,
    handleDateFormatChange,
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
    handleDropDown,
    error,
    validateConfirmPassword
}) => (
    <BlockContainer error={error}>
        <BlockHeading title="Register for bolster systems" />
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <Field name="First name" reqiured={true} sizeClasses="size-lg-4">
                <TextInputContainer
                    value={firstName}
                    name={'User.firstName'}
                    placeholder="Please enter your first name"
                    handleChange={handleInputChange}
                />
            </Field>
            <Field name="Last Name" reqiured={true} sizeClasses="size-lg-4">
                <TextInputContainer
                    value={lastName}
                    name="User.lastName"
                    placeholder="Please enter your last name"
                    required
                    handleChange={handleInputChange}
                />
            </Field>

            <Field name="Email" reqiured={true} sizeClasses="size-lg-4">
                <TextInputContainer
                    value={email}
                    name="User.email"
                    type="email"
                    placeholder="Please enter your email"
                    required
                    handleChange={handleInputChange}
                />
            </Field>
            <Field name="Password" reqiured={true} sizeClasses="size-lg-4">
                <TextInputContainer
                    value={password}
                    name="User.password"
                    type="password"
                    placeholder="Please enter your password"
                    handleChange={handleInputChange}
                    required
                />
            </Field>

            <Field
                name="Confirm password"
                required={true}
                sizeClasses="size-lg-4"
            >
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

            <Field name="Telephone" reqiured={true} sizeClasses="size-lg-4">
                <TextInputContainer
                    value={phoneNumber}
                    name="Company.phoneNumber"
                    placeholder="Please enter your telephone number"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <div className="size-lg-12" />
            <Field name="Business name" reqiured={true} sizeClasses="size-lg-4">
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
                reqiured={true}
                sizeClasses="size-lg-4"
            >
                <TextInputContainer
                    value={addressLine1}
                    name="Company.addressLine1"
                    placeholder="Address line 1"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Town/City" reqiured={true} sizeClasses="size-lg-4">
                <TextInputContainer
                    value={town}
                    name="Company.town"
                    placeholder="Town or City"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Postcode" reqiured={true} sizeClasses="size-lg-4">
                <TextInputContainer
                    value={postcode}
                    name="Company.postcode"
                    placeholder="Postcode"
                    handleChange={handleInputChange}
                    required
                />
            </Field>

            <Field name="Timezone" reqiured={true}>
                <NewSelect
                    options={timezoneOptions}
                    value={timezone}
                    isSearchable
                    onChange={handleDropDown}
                    name="Company.timezone"
                    singleSelect
                />
            </Field>
            <Field name="Date format" reqiured={true}>
                <NewSelect
                    options={dateFormats}
                    value={dateFormatID}
                    onChange={handleDateFormatChange}
                    name="Company.dateFormatID"
                    singleSelect
                    required
                />
            </Field>

            <Field name="VAT Type" reqiured={true}>
                <NewSelect
                    options={vatOptions}
                    value={vatType}
                    onChange={handleDropDown}
                    name="Company.vatType"
                    singleSelect
                    required
                />
            </Field>
            {vatType !== VAT_TYPES.OUTSIDEEU && (
                <Field name="VAT Code" reqiured={true}>
                    <TextInputContainer
                        name="Company.vatCode"
                        value={vatCode}
                        handleChange={handleInputChange}
                        required={vatType !== VAT_TYPES.OUTSIDEEU}
                    />
                </Field>
            )}
            <Field name="Terms and Conditions" reqiured={true}>
                <p className="generic-text size-lg-12">
                    To register, please agree to our Terms and Conditions.
                </p>
                <Checkbox
                    checked={terms}
                    handleChange={handleInputChange}
                    name="terms"
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
