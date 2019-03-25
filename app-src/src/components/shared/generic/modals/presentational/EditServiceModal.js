import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeadingWControls from '../../blockHeadingWControls/presentational/BlockHeadingWControls';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';
import TextInputContainer from '../../form/containers/TextInputContainer';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const EditServiceModal = ({ name, handleChange, handleSubmit, hideModal }) => (
    <ModalOuterContainer>
        <BlockHeadingWControls title="Edit Service" />

        <Form className="generic-form" onSubmit={handleSubmit}>
            <div className="size-lg-6">
                <Field name="Service name">
                    <TextInputContainer
                        handleChange={handleChange}
                        name="name"
                        value={name}
                        required
                    />
                </Field>
            </div>
            <BlockButtonWrapper>
                <button className="button">Save</button>
                <button className="button" onClick={hideModal}>
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default EditServiceModal;
