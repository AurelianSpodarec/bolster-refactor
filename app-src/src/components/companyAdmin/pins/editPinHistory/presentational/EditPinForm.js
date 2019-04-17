import React from 'react';
import { Link, Prompt } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import EditPinVersionsContainer from '../containers/EditPinVersionsContainer';

const EditPinForm = ({
    location,
    handleChange,
    handleSubmit,
    statuses,
    selectedStatus,
    filesUploading,
    confirmLeave,
    selectedHistory
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <Field name="Select a status" sizeClasses="size-lg-6">
            <DropdownContainer
                placeholder="-- select --"
                name="statusID"
                options={statuses}
                selectedOption={selectedStatus}
                handleChange={handleChange}
                required
            />
        </Field>

        <EditPinVersionsContainer
            templateVersionID={selectedHistory.templateVersionID}
        />

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
                        Edit pin
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

export default EditPinForm;
