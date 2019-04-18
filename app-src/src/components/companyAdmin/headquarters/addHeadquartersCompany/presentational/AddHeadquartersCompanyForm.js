import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { VAT_TYPES } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AddHeadquartersCompanyForm = ({
    company: {
        name,
        addressLine1,
        town,
        postcode,
        vatType,
        vatCode,
        dateFormat,
        timezone
    },
    user: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword
    },
    dateFormats,
    timezones,
    vatOptions,
    handleUserChange,
    handleCompanyChange,
    handleVatTypeChange,
    handleSubmit,
    handleDateFormatChange,
    handleTimezoneChange,
    validateConfirmPassword
}) => (
    <Form
        className="generic-form size-lg-12 size-lg-12"
        onSubmit={handleSubmit}
    >
        {/* company information */}
        <BlockHeading title="Company information" />
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Company name">
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleCompanyChange}
                        required
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Address">
                    <TextInputContainer
                        name="addressLine1"
                        value={addressLine1}
                        handleChange={handleCompanyChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Town">
                    <TextInputContainer
                        name="town"
                        value={town}
                        handleChange={handleCompanyChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Postcode">
                    <TextInputContainer
                        name="postcode"
                        value={postcode}
                        handleChange={handleCompanyChange}
                        required
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="VAT Type">
                    <Select
                        value={vatType}
                        options={vatOptions}
                        onChange={handleVatTypeChange}
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                {vatType.value !== VAT_TYPES.OUTSIDEEU && (
                    <Field name="VAT Code">
                        <TextInputContainer
                            name="vatCode"
                            value={vatCode}
                            handleChange={handleCompanyChange}
                            required={vatType.value !== VAT_TYPES.OUTSIDEEU}
                        />
                    </Field>
                )}
            </div>
            <div>
                <Field name="timezone">
                    <Select
                        options={timezones}
                        value={timezone}
                        isSearchable
                        onChange={handleTimezoneChange}
                    />
                </Field>
                <Field name="Date format">
                    <Select
                        options={dateFormats}
                        value={dateFormat}
                        isSearchable
                        onChange={handleDateFormatChange}
                    />
                </Field>
            </div>
        </div>
        {/* first user information */}
        <BlockHeading title="Company user information" />
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="First name">
                    <TextInputContainer
                        name="firstName"
                        value={firstName}
                        handleChange={handleUserChange}
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Last name">
                    <TextInputContainer
                        name="lastName"
                        value={lastName}
                        handleChange={handleUserChange}
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="E-mail Address">
                    <TextInputContainer
                        name="email"
                        value={email}
                        handleChange={handleUserChange}
                        type="email"
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field name="Phone number">
                    <TextInputContainer
                        name="phoneNumber"
                        value={phoneNumber}
                        handleChange={handleUserChange}
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                <div className="size-lg-6">
                    <Field name="Password">
                        <TextInputContainer
                            name="password"
                            value={password}
                            handleChange={handleUserChange}
                            type="password"
                        />
                    </Field>
                </div>
                <div className="size-lg-6">
                    <Field name="Confirm password">
                        <TextInputContainer
                            name="confirmPassword"
                            value={confirmPassword}
                            handleChange={handleUserChange}
                            type="password"
                            validate={validateConfirmPassword}
                        />
                    </Field>
                </div>
            </div>
        </div>
        <BlockButtonWrapper>
            <button className="button" type="submit">
                Submit
            </button>
            <Link className="button" to="/company/headquarters/companies">
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default AddHeadquartersCompanyForm;
