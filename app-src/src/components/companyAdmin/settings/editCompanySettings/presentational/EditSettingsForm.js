import React from 'react';
import { withRouter } from 'react-router-dom';
import { HuePicker } from 'react-color';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import { VAT_TYPES } from 'constants/companyAdmin/enums';

const EditSettingsForm = ({
    handleInputChange,
    handleSubmit,
    handleFileChange,
    templateUsageRules,
    filesUploading,
    location,
    name,
    addressLine1,
    addressLine2,
    town,
    county,
    postcode,
    vatCode,
    vatType,
    vatOptions,
    logoFile,
    colourCode,
    isBolsterLogoDark,
    isUsingBolsterLabels,
    telephone,
    fax,
    labelTelNumber,
    labelCompanyName,
    hideOnClientList,
    isEditButtonEnabled,
    selectedRule,
    timeZoneOptions,
    timeZone,
    dateFormatOptions,
    dateFormat,
    defaultSitesSort,
    siteSortOptions,
    shouldDeleteReportsAfterDownload,
}) => (
    <>
        <Form className="generic-form ize-lg-12" onSubmit={handleSubmit}>
            {/* <p>##Company Details##</p> */}
            <Field name="Company Name" sizeClasses="size-lg-6 size-md-12" required>
                <TextInputContainer
                    value={name}
                    name="name"
                    type="text"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Address Line 1" sizeClasses="size-lg-6 size-md-12" required>
                <TextInputContainer
                    value={addressLine1}
                    name="addressLine1"
                    type="text"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Address Line 2" sizeClasses="size-lg-6 size-md-12">
                <TextInputContainer
                    value={addressLine2}
                    name="addressLine2"
                    type="text"
                    handleChange={handleInputChange}
                />
            </Field>
            <Field name="Town" sizeClasses="size-lg-6 size-md-12" required>
                <TextInputContainer
                    value={town}
                    name="town"
                    type="text"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="County" sizeClasses="size-lg-6 size-md-12" required>
                <TextInputContainer
                    value={county}
                    name="county"
                    type="text"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Postcode" sizeClasses="size-lg-6 size-md-12" required>
                <TextInputContainer
                    value={postcode}
                    name="postcode"
                    type="text"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Telephone No." sizeClasses="size-lg-6 size-md-12" required>
                <TextInputContainer
                    value={telephone}
                    name="telephone"
                    type="text"
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Fax No." sizeClasses="size-lg-6 size-md-12">
                <TextInputContainer
                    value={fax}
                    name="fax"
                    type="text"
                    handleChange={handleInputChange}
                />
            </Field>
            <Field name="VAT Type" sizeClasses="size-lg-6 size-md-12" required>
                <Select
                    name="vatType"
                    options={vatOptions}
                    value={vatType}
                    onChange={handleInputChange}
                    omitPlaceholder
                    required
                />
            </Field>
            {vatType && vatType !== VAT_TYPES.OUTSIDEEU && (
                <Field
                    name="VAT Code"
                    required={vatType !== VAT_TYPES.OUTSIDEEU}
                    sizeClasses="size-lg-6 size-md-12"
                >
                    <TextInputContainer
                        value={vatCode}
                        name="vatCode"
                        type="text"
                        handleChange={handleInputChange}
                    />
                </Field>
            )}

            <div className="size-lg-12">
                {/* <p>##Display Settings##</p> */}
                <Field name="Change Company Logo">
                    <FileUploadContainer
                        name="logoFile"
                        value={logoFile}
                        acceptedTypes={['application/pdf', 'image/*']}
                        handleChange={handleFileChange}
                    />
                </Field>
                <div className="size-lg-6 size-md-12">
                    <Field name="Change Colour Scheme">
                        <div className="size-lg-12">
                            <HuePicker
                                color={colourCode || '#FFF'}
                                onChangeComplete={e => handleInputChange('colourCode', e.hex)}
                            />
                        </div>
                    </Field>
                </div>
                <div className="size-lg-6 size-md-12">
                    <Field name="Colour scheme (hex code)">
                        <div
                            style={{
                                backgroundColor: colourCode
                            }}
                            className="hex-box"
                        />
                        <TextInputContainer
                            value={colourCode}
                            name="colourCode"
                            handleChange={handleInputChange}
                            classes="colour-picker-input"
                        />
                    </Field>
                </div>
                <Field name="Dark Mode">
                    <CheckboxContainer
                        checked={isBolsterLogoDark}
                        handleChange={handleInputChange}
                        name="isBolsterLogoDark"
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                {/* <p>##Label Settings##</p> */}
                <Field name="Use Bolster Labels">
                    <CheckboxContainer
                        checked={isUsingBolsterLabels}
                        handleChange={handleInputChange}
                        name="isUsingBolsterLabels"
                    />
                </Field>
                {isUsingBolsterLabels && (
                    <>
                        <Field name="Label Company Name" sizeClasses="size-lg-6 size-md-12">
                            <TextInputContainer
                                value={labelCompanyName}
                                name="labelCompanyName"
                                type="text"
                                handleChange={handleInputChange}
                            />
                        </Field>
                        <Field name="Label Telephone No." sizeClasses="size-lg-6 size-md-12">
                            <TextInputContainer
                                value={labelTelNumber}
                                name="labelTelNumber"
                                type="text"
                                handleChange={handleInputChange}
                            />
                        </Field>
                    </>
                )}
            </div>
            <div className="size-lg-12">
                {/* <p>##Template Settings##</p> */}
                <Field name="Default Template Usage Rule" sizeClasses="size-lg-12" required>
                    <DropdownContainer
                        placeholder="-- select rule --"
                        name="defaultTemplateUsageRule"
                        options={templateUsageRules}
                        value={selectedRule}
                        selectedOption={selectedRule}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                <Field name="Default sites list sort" sizeClasses="size-lg-6 size-md-12">
                    <Select
                        options={siteSortOptions}
                        onChange={handleInputChange}
                        name="defaultSitesSort"
                        value={defaultSitesSort}
                        omitPlaceholder
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                {/* <p>##Bolster Client List##</p> */}
                <Field name="Hide On Client List" sizeClasses="size-lg-6 size-md-12">
                    <CheckboxContainer
                        checked={hideOnClientList}
                        handleChange={handleInputChange}
                        name="hideOnClientList"
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                <Field name="Allow companies to edit?" sizeClasses="size-lg-6 size-md-12">
                    <CheckboxContainer
                        checked={isEditButtonEnabled}
                        handleChange={handleInputChange}
                        name="isEditButtonEnabled"
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                <Field name="Delete reports after download?" sizeClasses="size-lg-6 size-md-12">
                    <CheckboxContainer
                        checked={shouldDeleteReportsAfterDownload}
                        handleChange={handleInputChange}
                        name="shouldDeleteReportsAfterDownload"
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                <Field name="Time zone">
                    <Select
                        options={timeZoneOptions}
                        name="timeZone"
                        value={timeZone}
                        isSearchable
                        onChange={handleInputChange}
                    />
                </Field>
                <Field name="Date format">
                    <Select
                        options={dateFormatOptions}
                        value={dateFormat}
                        name="dateFormat"
                        isSearchable
                        onChange={handleInputChange}
                    />
                </Field>
            </div>
            <BlockButtonWrapper>
                <button disabled={filesUploading} onClick={handleSubmit} className="button green">
                    {filesUploading ? 'Please wait...' : <>{'Confirm'}</>}
                </button>
                <ButtonContainer to={location.pathname.replace('/edit-settings', '')}>
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default withRouter(EditSettingsForm);
