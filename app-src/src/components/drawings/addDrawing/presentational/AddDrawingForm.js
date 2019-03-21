import React from 'react';
import { Link } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const AddDrawingForm = ({ handleSubmit, handleInputChange, floorID, name }) => (
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
                <label className="title">Upload file</label>
                <FileUploadContainer />
            </div>
        </div>

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Add Floor
            </button>
            <Link className="button" to={`/floors/${floorID}`}>
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);
export default AddDrawingForm;
