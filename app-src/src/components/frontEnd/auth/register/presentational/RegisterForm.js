import React from 'react';
import { Link } from 'react-router-dom';

import { VAT_TYPES } from 'constants/companyAdmin/enums';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import FrontEndFormHeading from 'components/frontEnd/shared/forms/presentational/FrontEndFormHeading';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import { needsVatCode } from 'constants/shared/vatTypes';

const RegisterForm = ({
    handleSubmit,
    handleChange,
    timezoneOptions,
    'User.email': email,
    'User.password': password,
    confirmPassword,
    'User.firstName': firstName,
    'User.lastName': lastName,
    'User.phoneNumber': phoneNumber,
    'Company.name': name,
    'Company.addressLine1': addressLine1,
    'Company.addressLine2': addressLine2,
    'Company.town': town,
    'Company.county': county,
    'Company.postcode': postcode,
    'Company.country': country,
    'Company.phoneNumber': companyPhoneNumber,
    'Company.fax': fax,
    'Company.vatCode': vatCode,
    'Company.vatType': vatType,
    vatOptions,
    dateFormats,
    'Company.dateFormatID': dateFormatID,
    'Company.timezone': timezone,
    terms,
    validatePassword,
    validateConfirmPassword,
    handlePaginationClick,
    activePage,
    disabled,
    isPosting,
}) => {
    const isVatCodeRequired = needsVatCode(vatType);

    return (
        <div className="auth-form-wrapper wide">
            <Form onSubmit={handleSubmit}>
                <FrontEndFormHeading
                    title="Register"
                    subtitle={
                        activePage === 1
                            ? 'User Details'
                            : activePage === 2
                            ? 'Company Details'
                            : activePage === 3
                            ? 'Company Address'
                            : ''
                    }
                />
                <div className={`register-input-wrapper ${activePage === 1 ? 'active' : ''}`}>
                    <Field required name="First Name" classes="auth-form-field wide">
                        <TextInputContainer
                            value={firstName}
                            name="User.firstName"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="Last Name" classes="auth-form-field wide">
                        <TextInputContainer
                            value={lastName}
                            name="User.lastName"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="Phone Number" classes="auth-form-field wide">
                        <TextInputContainer
                            value={phoneNumber}
                            name="User.phoneNumber"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="Email" classes="auth-form-field wide">
                        <TextInputContainer
                            value={email}
                            name="User.email"
                            type="email"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="Password" classes="auth-form-field wide">
                        <TextInputContainer
                            value={password}
                            name="User.password"
                            type="password"
                            required
                            handleChange={handleChange}
                            validate={validatePassword}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="Confirm Password" classes="auth-form-field wide">
                        <TextInputContainer
                            name="confirmPassword"
                            value={confirmPassword}
                            handleChange={handleChange}
                            type="password"
                            validate={validateConfirmPassword}
                            required
                            classes="auth-text-input-container"
                        />
                    </Field>
                </div>
                <div className={`register-input-wrapper ${activePage === 2 ? 'active' : ''}`}>
                    <Field required name="Name" classes="auth-form-field wide">
                        <TextInputContainer
                            value={name}
                            name="Company.name"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="Telephone" classes="auth-form-field wide">
                        <TextInputContainer
                            value={companyPhoneNumber}
                            name="Company.phoneNumber"
                            required
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field name="Fax" classes="auth-form-field wide">
                        <TextInputContainer
                            value={fax}
                            name="Company.fax"
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="Timezone" classes="auth-form-field wide">
                        <Select
                            name="Company.timezone"
                            options={timezoneOptions}
                            value={timezone}
                            onChange={handleChange}
                            placeholer="GMT"
                            required
                            search
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="Date Format" classes="auth-form-field wide">
                        <Select
                            name="Company.dateFormatID"
                            options={dateFormats}
                            value={dateFormatID}
                            onChange={handleChange}
                            omitPlaceholder
                            required
                            search
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="VAT Type" classes="auth-form-field wide">
                        <Select
                            name="Company.vatType"
                            options={vatOptions}
                            value={vatType}
                            onChange={handleChange}
                            omitPlaceholder
                            required
                            classes="auth-text-input-container"
                        />
                    </Field>
                    {vatType && isVatCodeRequired && (
                        <Field
                            name="VAT Code"
                            smallDesc={
                                vatType === VAT_TYPES.GB
                                    ? '(Please enter GB before your VAT code e.g GB123456789)'
                                    : null
                            }
                            required={isVatCodeRequired}
                            classes="auth-form-field wide"
                        >
                            <TextInputContainer
                                name="Company.vatCode"
                                value={vatCode}
                                handleChange={handleChange}
                                required={isVatCodeRequired}
                                classes="auth-text-input-container"
                            />
                        </Field>
                    )}
                </div>
                <div className={`register-input-wrapper ${activePage === 3 ? 'active' : ''}`}>
                    <Field required name="Address Line 1" classes="auth-form-field wide">
                        <TextInputContainer
                            value={addressLine1}
                            name="Company.addressLine1"
                            handleChange={handleChange}
                            required
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field name="Address Line 2" classes="auth-form-field wide">
                        <TextInputContainer
                            value={addressLine2}
                            name="Company.addressLine2"
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                        />
                    </Field>
                    <Field required name="Town/City" classes="auth-form-field wide">
                        <TextInputContainer
                            value={town}
                            type="text"
                            name="Company.town"
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                            required
                        />
                    </Field>
                    <Field required name="County" classes="auth-form-field wide">
                        <TextInputContainer
                            value={county}
                            name="Company.county"
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                            required
                        />
                    </Field>
                    <Field required name="Postcode" classes="auth-form-field wide">
                        <TextInputContainer
                            value={postcode}
                            name="Company.postcode"
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                            required
                        />
                    </Field>
                    <Field required name="Country" classes="auth-form-field wide">
                        <TextInputContainer
                            value={country}
                            name="Company.country"
                            handleChange={handleChange}
                            classes="auth-text-input-container"
                            required
                        />
                    </Field>
                    <Field required classes="auth-form-field wide row">
                        <p className="generic-text size-lg-12">
                            I agree to Bolster Systems{terms}{' '}
                            <Link to="/auth/terms">Terms of Service</Link> and{' '}
                            <Link to="/auth/privacy-policy">Privacy Policy</Link>
                        </p>
                        <CheckboxContainer
                            checked={terms}
                            handleChange={handleChange}
                            name="terms"
                            required
                            classes="tickbox"
                        />
                    </Field>
                </div>
                <Field required classes="auth-form-field wide row">
                    <div className="item-wrapper left">
                        {activePage !== 1 && (
                            <FrontEndButton
                                classes={`gray ${disabled ? 'disabled' : ''}`}
                                type="button"
                                handleClick={
                                    !disabled ? () => handlePaginationClick(activePage - 1) : ''
                                }
                            >
                                Back
                            </FrontEndButton>
                        )}
                    </div>
                    <div className="item-wrapper column">
                        <div className="page-number">
                            <p>{activePage}/3</p>
                        </div>
                        <div className="auth-nav-box-wrapper">
                            <div
                                className={`auth-nav-box ${activePage === 1 ? 'selected' : ''}`}
                                onClick={!disabled ? () => handlePaginationClick(1) : ''}
                            ></div>
                            <div
                                className={`auth-nav-box ${activePage === 2 ? 'selected' : ''}`}
                                onClick={!disabled ? () => handlePaginationClick(2) : ''}
                            ></div>
                            <div
                                className={`auth-nav-box ${activePage === 3 ? 'selected' : ''}`}
                                onClick={!disabled ? () => handlePaginationClick(3) : ''}
                            ></div>
                        </div>
                    </div>
                    <div className="item-wrapper right">
                        {activePage !== 3 ? (
                            <FrontEndButton
                                classes={`gray ${disabled ? 'disabled' : ''}`}
                                type="button"
                                handleClick={
                                    !disabled ? () => handlePaginationClick(activePage + 1) : ''
                                }
                            >
                                Next
                            </FrontEndButton>
                        ) : (
                            <FrontEndButton
                                classes={`red ${disabled ? 'disabled' : ''}`}
                                type="submit"
                            >
                                Submit
                            </FrontEndButton>
                        )}
                    </div>
                </Field>
            </Form>
        </div>
    );
};

export default RegisterForm;
