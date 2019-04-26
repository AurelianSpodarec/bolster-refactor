import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { VAT_TYPES } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';

const AddHeadquartersCompanyForm = ({
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
    timezoneOptions,
    'Company.dateFormatID': dateFormatID,
    'Company.timezone': timezone,
    handleChange,
    handleSubmit,
    handleDropDown,
    validatePassword,
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
                <Field reqiured={true} name="Company name">
                    <TextInputContainer
                        name="Company.name"
                        value={name}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field reqiured={true} name="Address">
                    <TextInputContainer
                        name="Company.addressLine1"
                        value={addressLine1}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field reqiured={true} name="Town">
                    <TextInputContainer
                        name="Company.town"
                        value={town}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field reqiured={true} name="Postcode">
                    <TextInputContainer
                        name="Company.postcode"
                        value={postcode}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field reqiured={true} name="VAT Type">
                    <NewSelect
                        options={vatOptions}
                        value={vatType}
                        onChange={handleDropDown}
                        name="Company.vatType"
                        singleSelect
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                {vatType !== VAT_TYPES.OUTSIDEEU && (
                    <Field reqiured={true} name="VAT Code">
                        <TextInputContainer
                            name="Company.vatCode"
                            value={vatCode}
                            handleChange={handleChange}
                            required={vatType !== VAT_TYPES.OUTSIDEEU}
                        />
                    </Field>
                )}
            </div>
            <div className="size-lg-12">
                <Field reqiured={true} name="Timezone">
                    <NewSelect
                        options={timezoneOptions}
                        value={timezone}
                        onChange={handleDropDown}
                        name="Company.timezone"
                        singleSelect
                    />
                </Field>
                <Field reqiured={true} name="Date format">
                    <NewSelect
                        options={dateFormats}
                        value={dateFormatID}
                        onChange={handleDropDown}
                        name="Company.dateFormatID"
                        singleSelect
                        required
                    />
                </Field>
            </div>
        </div>
        {/* first user information */}
        <BlockHeading title="Company user information" />
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field reqiured={true} name="First name">
                    <TextInputContainer
                        name="User.firstName"
                        value={firstName}
                        handleChange={handleChange}
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field reqiured={true} name="Last name">
                    <TextInputContainer
                        name="User.lastName"
                        value={lastName}
                        handleChange={handleChange}
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field reqiured={true} name="E-mail Address">
                    <TextInputContainer
                        name="User.email"
                        value={email}
                        handleChange={handleChange}
                        type="email"
                    />
                </Field>
            </div>
            <div className="size-lg-6">
                <Field reqiured={true} name="Phone number">
                    <TextInputContainer
                        name="Company.phoneNumber"
                        value={phoneNumber}
                        handleChange={handleChange}
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                <div className="size-lg-6">
                    <Field reqiured={true} name="Password">
                        <TextInputContainer
                            name="User.password"
                            value={password}
                            handleChange={handleChange}
                            type="password"
                            validate={validatePassword}
                        />
                    </Field>
                </div>
                <div className="size-lg-6">
                    <Field reqiured={true} name="Confirm password">
                        <TextInputContainer
                            name="confirmPassword"
                            value={confirmPassword}
                            handleChange={handleChange}
                            type="password"
                            validate={validateConfirmPassword}
                        />
                    </Field>
                </div>
            </div>
        </div>
        <BlockButtonWrapper>
            <button className="button green" type="submit">
                Submit
            </button>
            <Link className="button" to="/company/headquarters/companies">
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default AddHeadquartersCompanyForm;
