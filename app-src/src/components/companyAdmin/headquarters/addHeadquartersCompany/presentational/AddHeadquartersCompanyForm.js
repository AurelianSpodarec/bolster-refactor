import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { VAT_TYPES } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
            <div className="size-lg-6 size-md-12">
                <Field name="Company name" required>
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
            <div className="size-lg-6 size-md-12">
                <Field name="Address" required>
                    <TextInputContainer
                        name="Company.addressLine1"
                        value={addressLine1}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Town" required>
                    <TextInputContainer
                        name="Company.town"
                        value={town}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Postcode" required>
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
            <div className="size-lg-6 size-md-12">
                <Field name="VAT Type" required>
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
            <div className="size-lg-6 size-md-12">
                {vatType !== VAT_TYPES.OUTSIDEEU && (
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
            </div>
            <div className="size-lg-12">
                <Field name="Timezone" required>
                    <NewSelect
                        options={timezoneOptions}
                        value={timezone}
                        onChange={handleDropDown}
                        name="Company.timezone"
                        singleSelect
                        required
                    />
                </Field>
                <Field name="Date format" required>
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
            <div className="size-lg-6 size-md-12">
                <Field name="First name" required>
                    <TextInputContainer
                        name="User.firstName"
                        value={firstName}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Last name" required>
                    <TextInputContainer
                        name="User.lastName"
                        value={lastName}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Email Address" required>
                    <TextInputContainer
                        name="User.email"
                        value={email}
                        handleChange={handleChange}
                        type="email"
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Phone number" required>
                    <TextInputContainer
                        name="Company.phoneNumber"
                        value={phoneNumber}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                <div className="size-lg-6 size-md-12">
                    <Field name="Password" required>
                        <TextInputContainer
                            name="User.password"
                            value={password}
                            handleChange={handleChange}
                            type="password"
                            validate={validatePassword}
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-6 size-md-12">
                    <Field name="Confirm password" required>
                        <TextInputContainer
                            name="confirmPassword"
                            value={confirmPassword}
                            handleChange={handleChange}
                            type="password"
                            validate={validateConfirmPassword}
                            required
                        />
                    </Field>
                </div>
            </div>
        </div>
        <BlockButtonWrapper>
            <button className="button green" type="submit">
                Submit
            </button>
            <ButtonContainer to="/company/headquarters/companies">
                Cancel
            </ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default AddHeadquartersCompanyForm;
