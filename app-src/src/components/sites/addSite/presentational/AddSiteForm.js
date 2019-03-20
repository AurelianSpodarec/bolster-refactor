import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const AddSiteForm = ({
    handleSubmit,
    handleInputChange,
    name,
    client,
    addressLine1,
    addressLine2,
    postcode
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-6">
            <Field name="Site Name">
                <TextInputContainer
                    name="name"
                    value={name}
                    handleChange={handleInputChange}
                    required
                />
            </Field>
            <Field name="Client Name">
                <TextInputContainer
                    value={client}
                    name="client"
                    required
                    handleChange={handleInputChange}
                />
            </Field>
        </div>
        <div className="size-lg-6">
            <Field name="Address Line 1">
                <TextInputContainer
                    value={addressLine1}
                    name="addressLine1"
                    handleChange={handleInputChange}
                />
            </Field>
            <Field name="Address Line 2">
                <TextInputContainer
                    value={addressLine2}
                    name="addressLine2"
                    handleChange={handleInputChange}
                />
            </Field>
            <Field name="Postcode">
                <TextInputContainer
                    value={postcode}
                    name="postcode"
                    handleChange={handleInputChange}
                />
            </Field>
        </div>
        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Add Site
            </button>
            <button className="button">Cancel</button>
        </BlockButtonWrapper>
    </Form>
);
export default AddSiteForm;
