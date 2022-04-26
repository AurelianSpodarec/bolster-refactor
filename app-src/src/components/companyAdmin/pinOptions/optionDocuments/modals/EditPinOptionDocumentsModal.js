import React from 'react';

import useEditPinOptionDocument from '../hooks/useEditPinOptionDocument';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ModalHeading from 'components/shared/generic/modals/presentational/ModalHeading';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const EditPinOptionDocumentsModal = ({ hideModal, documentsVersion }) => {
    const { form, handleChange, isPosting, handleSubmit } =
        useEditPinOptionDocument(documentsVersion);

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title="Edit File" />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="" required>
                    <FileUploadContainer
                        value={form.documentS3Key}
                        name="documentS3Key"
                        acceptedTypes={['application/pdf', 'image/jpg', 'image/png', 'image/jpeg']}
                        handleChange={handleChange}
                        maxFiles={1}
                        required
                    />
                </Field>

                <Field name="Product Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        placeholder="Enter Text Here..."
                        required
                    />
                </Field>

                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={hideModal}
                            source="secondary"
                            size="medium"
                        />
                        <ActionButton
                            text="Confirm"
                            size="medium"
                            disabled={isPosting}
                            type="submit"
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditPinOptionDocumentsModal;
