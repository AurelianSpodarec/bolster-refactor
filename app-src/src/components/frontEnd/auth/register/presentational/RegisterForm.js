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
    error,
    validatePassword,
    validateConfirmPassword,
    handlePaginationClick,
    activePage,
}) => {
    const isVatCodeRequired = needsVatCode(vatType);
    if (activePage === 2) {
        return (
            <div className="auth-form-wrapper wide">
                <FrontEndFormHeading title="Register" subtitle="Company Details" />
                <Form onSubmit={handleSubmit}>
                    <div className="register-input-wrapper">
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
                        <Field required name="Fax" classes="auth-form-field wide">
                            <TextInputContainer
                                value={fax}
                                name="Company.fax"
                                placeholder="Fax No."
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
                                omitPlaceholder
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
                                classes="auth-text-input-container"
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
                    <Field required classes="auth-form-field buttons wide row">
                        <div className="item-wrapper left">
                            <FrontEndButton classes="gray" type="button">
                                Back
                            </FrontEndButton>
                        </div>
                        <div className="item-wrapper center">
                            <div
                                className="auth-nav-box"
                                onClick={() => handlePaginationClick(1)}
                            ></div>
                            <div className="auth-nav-box selected">
                                <div className="page-number">
                                    <p>2/3</p>
                                </div>
                            </div>
                            <div
                                className="auth-nav-box"
                                onClick={() => handlePaginationClick(3)}
                            ></div>
                        </div>
                        <div className="item-wrapper right">
                            <FrontEndButton classes="gray" type="button">
                                Next
                            </FrontEndButton>
                        </div>
                    </Field>
                </Form>
            </div>
        );
    }
    if (activePage === 3) {
        return (
            <div className="auth-form-wrapper wide">
                <FrontEndFormHeading title="Register" subtitle="Company Address" />
                <Form onSubmit={handleSubmit}>
                    <div className="register-input-wrapper">
                        <Field required name="Address Line 1" classes="auth-form-field wide">
                            <TextInputContainer
                                value={addressLine1}
                                name="Company.addressLine1"
                                handleChange={handleChange}
                                required
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field required name="Address Line 2" classes="auth-form-field wide">
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
                                name="Company.town"
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field required name="County" classes="auth-form-field wide">
                            <TextInputContainer
                                value={county}
                                name="Company.county"
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field required name="Postcode" classes="auth-form-field wide">
                            <TextInputContainer
                                value={postcode}
                                name="Company.postcode"
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field required name="Country" classes="auth-form-field wide">
                            <TextInputContainer
                                value={country}
                                name="Company.country"
                                handleChange={handleChange}
                                classes="auth-text-input-container"
                            />
                        </Field>
                        <Field required name="Terms and Conditions">
                            <p className="generic-text size-lg-12">
                                To register, please agree to our{terms}
                                <Link to="/auth/terms">Terms and Conditions</Link>.
                            </p>
                            <CheckboxContainer
                                checked={'terms'}
                                handleChange={handleChange}
                                name="terms"
                                required
                                classes="tickbox"
                            />
                        </Field>
                    </div>
                    <Field required classes="auth-form-field buttons wide row">
                        <div className="item-wrapper left">
                            <FrontEndButton classes="gray" type="button">
                                Back
                            </FrontEndButton>
                        </div>
                        <div className="item-wrapper center">
                            <div
                                className="auth-nav-box"
                                onClick={() => handlePaginationClick(1)}
                            ></div>
                            <div className="auth-nav-box" onClick={() => handlePaginationClick(2)}>
                                <div className="page-number">
                                    <p>3/3</p>
                                </div>
                            </div>
                            <div className="auth-nav-box selected"></div>
                        </div>
                        <div className="item-wrapper right">
                            <FrontEndButton classes="gray" type="button">
                                Next
                            </FrontEndButton>
                        </div>
                    </Field>
                </Form>
            </div>
        );
    }
    return (
        <div className="auth-form-wrapper wide">
            <FrontEndFormHeading title="Register" subtitle="User Details" />
            <Form onSubmit={handleSubmit}>
                <div className="register-input-wrapper">
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
                <Field required classes="auth-form-field row wide">
                    <div className="item-wrapper left">&nbsp;</div>
                    <div className="item-wrapper center">
                        <div className="auth-nav-box selected"></div>
                        <div className="auth-nav-box" onClick={() => handlePaginationClick(2)}>
                            <div className="page-number">
                                <p>1/3</p>
                            </div>
                        </div>
                        <div
                            className="auth-nav-box"
                            onClick={() => handlePaginationClick(3)}
                        ></div>
                    </div>
                    <div className="item-wrapper right">
                        <FrontEndButton classes="gray" type="button">
                            Next
                        </FrontEndButton>
                    </div>
                </Field>
            </Form>
        </div>
    );
};

export default RegisterForm;
