import React from 'react';
import { Link } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const AddDrawingForm = ({
    handleSubmit,
    handleInputChange,
    handleFileChange,
    floorID,
    name,
    file
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Drawing Name">
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Upload plan">
                    <FileUploadContainer
                        value={file}
                        required
                        name="file"
                        acceptedTypes={['application/pdf', 'image/*']}
                        handleChange={handleFileChange}
                    />
                </Field>
            </div>
        </div>

        <BlockButtonWrapper>
            <button className="button green" type="submit">
                <i className="fa fa-plus" /> Add Drawing
            </button>
            <Link className="button" to={`/company/floors/${floorID}`}>
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);
export default AddDrawingForm;
