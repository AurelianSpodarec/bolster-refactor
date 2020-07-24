import React from 'react';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FileUploadContainer from '../../form/containers/FileUploadContainer';

const UploadUserGuideModal = ({ fileName, fileS3Key, handleSubmit, handleChange, hideModal }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit User Details" />
            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-6">
                    <Field name="File name" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name={'fileName'}
                            value={fileName}
                            type="text"
                            required
                        />
                    </Field>
                </div>

                <div className="size-lg-12">
                    <Field name="Upload PDF or image" required>
                        <FileUploadContainer
                            name="fileS3Key"
                            acceptedTypes={['application/pdf']}
                            handleChange={handleChange}
                            required
                            value={fileS3Key}
                        />
                    </Field>
                </div>
                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        Submit
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default UploadUserGuideModal;
