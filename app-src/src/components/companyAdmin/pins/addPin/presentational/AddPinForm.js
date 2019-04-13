import React from 'react';
import { Link } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import AddPinVersionsContainer from '../containers/AddPinVersionsContainer';

const AddPinForm = ({
    location,
    handleChange,
    handleSubmit,
    templates,
    selectedTemplate
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <Field name="Select a template" sizeClasses="size-lg-6">
                <DropdownContainer
                    placeholder="-- select --"
                    name="templateID"
                    options={templates}
                    selectedOption={selectedTemplate}
                    handleChange={handleChange}
                    required
                />
            </Field>
        </div>

        {selectedTemplate && (
            <>
                <AddPinVersionsContainer
                    selectedTemplateID={selectedTemplate.value}
                />
            </>
        )}

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> Add Pin
            </button>
            <Link
                to={location.pathname.replace('/add-pin', '')}
                className="button"
            >
                Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default AddPinForm;
