import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const EditSettingsForm = ({
    handleInputChange,
    handleSubmit,
    handleFileChange,
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
    defaultTemplateUsageRule
}) => (
    <Form className="content-area size-lg-12" onSubmit={handleSubmit}>
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
        <Field name="Change Company Logo (optional)">
            <FileUploadContainer
                name="logoFile"
                value={logoFile}
                acceptedTypes={['application/pdf', 'image/*']}
                handleChange={handleFileChange}
            />
        </Field>
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
);

export default withRouter(EditSettingsForm);
