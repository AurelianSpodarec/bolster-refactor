import React from 'react';

import ModalOuter from '../../../../shared/generic/modals/presentational/ModalOuter';
import Form from '../../../../shared/generic/form/containers/Form';
import Field from '../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../shared/generic/form/containers/TextInputContainer';
import BlockHeadingWControls from '../../../../shared/generic/blockHeadingWControls/presentational/BlockHeadingWControls';
import BlockButtonWrapper from '../../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const TemplateformModal = ({
    action,
    name,
    handleChange,
    handleSubmit,
    handleCancel
}) => (
    <ModalOuter hideModal={handleCancel}>
        <BlockHeadingWControls title={`${action} template`} />
        <Form className="generic-form" onSubmit={handleSubmit}>
            <div className="size-lg-6">
                <Field name="name">
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
                    <i className="fa fa-plus" />
                    Save
                </button>
                <button className="button" onClick={handleCancel}>
                    <i className="fa fa-times" /> Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuter>
);

export default TemplateformModal;
