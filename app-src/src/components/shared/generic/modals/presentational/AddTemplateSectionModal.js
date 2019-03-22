import React from 'react';

import ModalOuterContainer from '../containers/ModalOuterContainer';
import Form from '../../form/containers/Form';
import Field from '../../form/presentational/Field';
import TextInputContainer from '../../form/containers/TextInputContainer';
import BlockHeadingWControls from '../../blockHeadingWControls/presentational/BlockHeadingWControls';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';

const AddTemplateSectionModal = ({
    name,
    handleChange,
    handleSubmit,
    hideModal
}) => (
    <ModalOuterContainer>
        <BlockHeadingWControls title="Add Section" />

        <Form className="generic-form" onSubmit={handleSubmit}>
            <div className="size-lg-6">
                <Field name="Section name">
                    <TextInputContainer
                        handleChange={handleChange}
                        name="name"
                        value={name}
                        required
                    />
                </Field>
            </div>
            <BlockButtonWrapper>
                <button className="button ">
                    <i className="fa fa-plus" /> Add Section
                </button>
                <button className="button" onClick={hideModal}>
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default AddTemplateSectionModal;
