import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import SubmitContainer from 'components/shared/generic/form/containers/SubmitContainer';

const AddDocumentToOptionValueForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    buttonText,
    name,
    validateName,
    fileS3Key,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        validate={validateName}
                        required
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Upload PDF or image" required>
                    <FileUploadContainer
                        name="fileS3Key"
                        acceptedTypes={['application/pdf', 'image/*']}
                        handleChange={handleInputChange}
                        required
                        value={fileS3Key}
                    />
                </Field>
            </div>
        </div>
        <BlockButtonWrapper>
            <SubmitContainer text={buttonText} withPlus />

            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddDocumentToOptionValueForm;
