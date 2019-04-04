import React from 'react';

import ModalOuterContainer from '../../../../shared/generic/modals/containers/ModalOuterContainer';
import Form from '../../../../shared/generic/form/containers/Form';
import Field from '../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../shared/generic/form/containers/TextInputContainer';
import BlockHeadingWControls from '../../../../shared/generic/blockHeadingWControls/presentational/BlockHeadingWControls';
import BlockButtonWrapper from '../../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const TemplateSectionFormModal = ({
    name,
    handleChange,
    handleSubmit,
    hideModal,
    action
}) => (
    <ModalOuterContainer>
        <BlockHeadingWControls title={`${action} section`} />

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
                    <i className="fa fa-plus" /> Save
                </button>
                <button className="button" onClick={hideModal}>
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default TemplateSectionFormModal;
