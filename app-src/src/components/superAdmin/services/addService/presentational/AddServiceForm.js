import React from 'react';
import { Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const AddServiceForm = ({
    handleSubmit,
    handleInputChange,
    name,
    templateOptions,
    templateUUIDs,
    showOnCompanySite,
    pinImageS3Key,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Service Name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Templates attached">
                    <MultiSelect
                        search
                        name="templateUUIDs"
                        placeholder="-- select a template --"
                        options={templateOptions}
                        value={templateUUIDs}
                        onChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12 size-md-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Pin Display Icon">
                    <p>Please upload your icon in .png format with a maximum size of 128x128.</p>
                    <br />
                    <FileUploadContainer
                        name="pinImageS3Key"
                        value={pinImageS3Key}
                        acceptedTypes={['image/png']}
                        handleChange={(name, value) => {
                            handleInputChange(name, value);
                        }}
                        maxHeight={128}
                        maxWidth={128}
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Available to companies?">
                    <CheckboxContainer
                        checked={showOnCompanySite}
                        handleChange={handleInputChange}
                        name="showOnCompanySite"
                    />
                </Field>
            </div>
        </div>
        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" />
                Add Service
            </button>
            <Link className="button" to="/admin/services">
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default AddServiceForm;
