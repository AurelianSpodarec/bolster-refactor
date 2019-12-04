import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SetImageModal = ({ name, file, handleChange, handleSubmit, hideModal }) => (
    <ModalOuterContainer extraClasses="w-form">
        <BlockHeading title="Add image" />
        <Form onSubmit={handleSubmit} className="generic-form">
            <Field name="Name" required>
                <TextInputContainer name="name" value={name} handleChange={handleChange} required />
            </Field>
            <Field name="Image">
                <FileUploadContainer
                    name="file"
                    value={file}
                    handleChange={handleChange}
                    required
                    acceptedTypes={['image/*']}
                    skipTemp
                />
            </Field>
            <BlockButtonWrapper>
                <button className="button green">
                    <i className="fa fa-plus" /> Add Image
                </button>
                <button className="button" onClick={hideModal}>
                    Cancel
                </button>
            </BlockButtonWrapper>
        </Form>
    </ModalOuterContainer>
);

export default SetImageModal;
