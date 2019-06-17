import React from 'react';
import { Link, Prompt } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import AddPinVersionsContainer from '../containers/AddPinVersionsContainer';

const AddPinForm = ({
    location,
    handleChange,
    handleSubmit,
    services,
    selectedService,
    templates,
    selectedTemplate,
    filesUploading,
    confirmLeave,
    isHistory
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <Field name="Select a service" sizeClasses="size-lg-6" required>
                <DropdownContainer
                    placeholder="-- select --"
                    name="serviceID"
                    options={services}
                    value={selectedService}
                    selectedOption={selectedService}
                    handleChange={handleChange}
                    required
                />
            </Field>
        </div>
        {!!selectedService && (
            <div className="size-lg-12">
                <Field
                    name="Select a template"
                    sizeClasses="size-lg-6"
                    required
                >
                    <DropdownContainer
                        placeholder="-- select --"
                        name="templateID"
                        options={templates}
                        value={selectedTemplate}
                        selectedOption={selectedTemplate}
                        handleChange={handleChange}
                        required
                    />
                </Field>
            </div>
        )}

        {!!selectedTemplate && (
            <AddPinVersionsContainer
                isHistory={isHistory}
                selectedTemplateID={selectedTemplate.value}
            />
        )}

        <BlockButtonWrapper>
            <Prompt
                when={confirmLeave}
                message={
                    'You will lose any added information, are you sure you would like to leave the page?'
                }
            />
            <button className="button green" disabled={filesUploading}>
                {filesUploading ? (
                    'Please wait...'
                ) : (
                    <>
                        <i className="fa fa-plus" />
                        Add pin {isHistory ? 'history' : ''}
                    </>
                )}
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
