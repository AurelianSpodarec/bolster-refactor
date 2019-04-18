import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const TemplateSectionFormModal = ({
    name,
    handleChange,
    handleSubmit,
    hideModal,
    action
}) => (
    <ModalOuterContainer>
        <BlockHeading title={`${action} section`} />

        <Form className="generic-form" onSubmit={handleSubmit}>
            <div className="size-lg-12">
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
                <button className="button blue">
                    <i className="fa fa-plus" /> Add Section
                </button>
                <button className="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default TemplateSectionFormModal;
