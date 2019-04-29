import React from 'react';
import { Link } from 'react-router-dom';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const AddServiceForm = ({ handleSubmit, handleInputChange, name }) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-6">
            <Field name="Service Name" required>
                <TextInputContainer
                    name="name"
                    value={name}
                    handleChange={handleInputChange}
                    required
                />
            </Field>
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
