import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const DeleteManufacturerForm = ({ handleSubmit, hideModal }) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">Are you sure you would like to delete this manufacturer.</div>

        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-check" /> Confirm
            </button>
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default DeleteManufacturerForm;
