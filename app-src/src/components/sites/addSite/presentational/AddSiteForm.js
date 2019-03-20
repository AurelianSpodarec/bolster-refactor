import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInput from 'components/shared/generic/form/presentational/TextInput';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AddSiteForm = () => (
    <form className="generic-form">
        <div className="size-lg-6">
            <Field name="Site Name">
                <TextInput name="siteName" type="text" />
            </Field>
            <Field name="Client Name">
                <TextInput name="clientName" type="text" />
            </Field>
        </div>
        <div className="size-lg-6">
            <Field name="Address Line 1">
                <TextInput name="siteAddressLine1" type="text" />
            </Field>
            <Field name="Address Line 2">
                <TextInput name="siteAddressLine2" type="text" />
            </Field>
            <Field name="Postcode">
                <TextInput name="Postcode" type="text" />
            </Field>
        </div>
        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Add Site
            </button>
            <button className="button">Cancel</button>
        </BlockButtonWrapper>
    </form>
);
export default AddSiteForm;
