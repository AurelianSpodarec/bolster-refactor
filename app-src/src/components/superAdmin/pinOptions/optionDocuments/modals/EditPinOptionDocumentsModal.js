import React from 'react';

import useEditPinOptionDocument from '../hooks/useEditPinOptionDocument';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const EditPinOptionDocumentsModal = ({ hideModal, documentsVersion }) => {
    const { form, handleChange, isPosting, handleSubmit } =
        useEditPinOptionDocument(documentsVersion);

    return (
        <FlexModalOuter title="Add new version">
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container">
                        <Field name="" required>
                            <FileUploadContainer
                                value={form.documentS3Key}
                                name="documentS3Key"
                                acceptedTypes={[
                                    'application/pdf',
                                    'image/jpg',
                                    'image/png',
                                    'image/jpeg',
                                ]}
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
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton text="Cancel" onClick={hideModal} source="secondary" />
                    <ActionButton text="Confirm" disabled={isPosting} type="submit" />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default EditPinOptionDocumentsModal;
