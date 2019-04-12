import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { HuePicker } from 'react-color';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import SwitchContainer from 'components/shared/generic/form/containers/SwitchContainer';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const EditSettingsForm = ({
    handleInputChange,
    handleSubmit,
    handleFileChange,
    handleColourSelect,
    handleCheckboxChange,
    templateUsageRules,
    filesUploading,
    location,
    name,
    addressLine1,
    addressLine2,
    town,
    county,
    postcode,
    logoFile,
    colourCode,
    isBolsterLogoDark,
    telephone,
    fax,
    labelTelNumber,
    labelCompanyName,
    hideOnClientList,
    selectedRule
}) => (
    <>
        <Form className="content-area size-lg-12" onSubmit={handleSubmit}>
            {/* <h1>Company Details</h1> */}
            <Field name="Company Name" sizeClasses="size-lg-6">
                <TextInputContainer
                    value={name}
                    name="name"
                    type="text"
                    handleChange={handleInputChange}
                    required
                    placeholder="company name..."
                />
            </Field>
            <Field name="Address Line 1" sizeClasses="size-lg-6">
                <TextInputContainer
                    value={addressLine1}
                    name="addressLine1"
                    type="text"
                    handleChange={handleInputChange}
                    required
                    placeholder="address line 1..."
                />
            </Field>
            <Field name="Address Line 2" sizeClasses="size-lg-6">
                <TextInputContainer
                    value={addressLine2}
                    name="addressLine2"
                    type="text"
                    handleChange={handleInputChange}
                    placeholder="address line 2..."
                />
            </Field>
            <Field name="Town" sizeClasses="size-lg-6">
                <TextInputContainer
                    value={town}
                    name="town"
                    type="text"
                    handleChange={handleInputChange}
                    placeholder="town..."
                    required
                />
            </Field>
            <Field name="County" sizeClasses="size-lg-6">
                <TextInputContainer
                    value={county}
                    name="county"
                    type="text"
                    handleChange={handleInputChange}
                    placeholder="town..."
                    required
                />
            </Field>
            <Field name="Postcode" sizeClasses="size-lg-6">
                <TextInputContainer
                    value={postcode}
                    name="postcode"
                    type="text"
                    handleChange={handleInputChange}
                    placeholder="postcode..."
                    required
                />
            </Field>
            <Field name="Telephone No." sizeClasses="size-lg-6">
                <TextInputContainer
                    value={telephone}
                    name="telephone"
                    type="text"
                    handleChange={handleInputChange}
                    placeholder="telephone..."
                    required
                />
            </Field>
            <Field name="Fax No." sizeClasses="size-lg-6">
                <TextInputContainer
                    value={fax}
                    name="fax"
                    type="text"
                    handleChange={handleInputChange}
                    placeholder="fax..."
                    required
                />
            </Field>
            <div>
                {/* <h1>Visual Settings</h1> */}
                <Field name="Change Company Logo (optional)">
                    <FileUploadContainer
                        name="logoFile"
                        value={logoFile}
                        acceptedTypes={['application/pdf', 'image/*']}
                        handleChange={handleFileChange}
                    />
                </Field>
                <Field name="Change Colour Scheme">
                    <div className="size-lg-12">
                        <HuePicker
                            color={colourCode}
                            onChangeComplete={handleColourSelect}
                        />
                    </div>
                </Field>
                <Field name="Dark Mode">
                    <Checkbox
                        checked={isBolsterLogoDark}
                        handleChange={handleCheckboxChange}
                        name="isBolsterLogoDark"
                    />
                </Field>
            </div>
            <div>
                {/* <h1>Label Settings</h1> */}
                <Field name="Label Company Name" sizeClasses="size-lg-6">
                    <TextInputContainer
                        value={labelCompanyName}
                        name="labelCompanyName"
                        type="text"
                        handleChange={handleInputChange}
                        placeholder="Label company name..."
                        required
                    />
                </Field>
                <Field name="Label Telephone No." sizeClasses="size-lg-6">
                    <TextInputContainer
                        value={labelTelNumber}
                        name="labelTelNumber"
                        type="text"
                        handleChange={handleInputChange}
                        placeholder="Label telephone no..."
                        required
                    />
                </Field>
            </div>
            <div>
                {/* <h1>Default Template Settings</h1> */}
                <Field
                    name="Default Template Usage Rule"
                    sizeClasses="size-lg-12"
                >
                    <DropdownContainer
                        placeholder="-- select rule --"
                        name="defaultTemplateUsageRule"
                        options={templateUsageRules}
                        selectedOption={selectedRule}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div>
                {/* <h1>Bolster Settings</h1> */}
                <Field name="Hide On Client List" sizeClasses="size-lg-6">
                    <Checkbox
                        checked={hideOnClientList}
                        handleChange={handleCheckboxChange}
                        name="hideOnClientList"
                    />
                </Field>
            </div>

            <BlockButtonWrapper>
                <button
                    disabled={filesUploading}
                    onClick={handleSubmit}
                    className="button green"
                >
                    {filesUploading ? (
                        'Please wait...'
                    ) : (
                        <>
                            <i className="fa fa-plus" /> {'Confirm Changes'}
                        </>
                    )}
                </button>
                <Link
                    to={location.pathname.replace('/edit-settings', '')}
                    className="button"
                >
                    <i className="fa fa-times" /> Cancel
                </Link>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default withRouter(EditSettingsForm);
