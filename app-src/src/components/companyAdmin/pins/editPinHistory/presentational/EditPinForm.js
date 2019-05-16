import React from 'react';
import { Prompt } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import EditPinVersionsContainer from '../containers/EditPinVersionsContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
        <Field name="Select a status" sizeClasses="size-lg-6" required>
            <DropdownContainer
                placeholder="-- select --"
                name="status"
                options={statuses}
                value={selectedStatus}
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
                        <i className="far fa-pencil fa-fw" />
                        Edit pin
                    </>
                )}
            </button>
            <ButtonContainer
                to={location.pathname.replace(
                    `/edit-history/${selectedHistory.id}`,
                    ''
                )}
            >
                Cancel
            </ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default EditPinForm;
