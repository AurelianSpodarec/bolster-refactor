import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const AddManufacturerForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    buttonText,
    name,
    validateName,
    serviceOptions,
    serviceIDs,
    handleShowAddDocForm,
    confirmNoDocument,
    fileS3Key,
    showConfirmNoDocument,
    docName,
}) => (
    <Form className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-12 size-md-12">
                <div className="size-lg-6 size-md-12">
                    <Field name="Document name">
                        <TextInputContainer
                            name="docName"
                            value={docName}
                            handleChange={handleInputChange}
                        />
                    </Field>
                </div>
                <div className="size-lg-6 size-md-12">
                    <Field name="Upload PDF or image">
                        <FileUploadContainer
                            name="fileS3Key"
                            acceptedTypes={['application/pdf', 'image/*']}
                            handleChange={handleInputChange}
                            value={fileS3Key}
                        />
                        {showConfirmNoDocument && !confirmNoDocument && (
                            <p className="error red-text text-accent-4">
                                {' '}
                                This is a required field{' '}
                            </p>
                        )}
                    </Field>
                </div>
            </div>
        </div>
        <div className="size-lg-12">
            <Field name="Select services for this option value" required>
                <MultiSelect
                    name="serviceIDs"
                    options={serviceOptions}
                    value={serviceIDs}
                    onChange={handleInputChange}
                    placeholder="-- select services --"
                    required
                    search
                />
            </Field>
        </div>
        <div className="size-lg-12">
            <Field name="Proceed without document?">
                <CheckboxContainer
                    checked={confirmNoDocument}
                    name="confirmNoDocument"
                    value={confirmNoDocument}
                    handleChange={handleShowAddDocForm}
                />
            </Field>
        </div>
        {confirmNoDocument && (
            <div className="size-lg-12">
                <div className="size-lg-6 size-md-12">
                    <Field name="Option Value Name" required>
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
        )}
        <BlockButtonWrapper>
            <button className="button green" onClick={e => handleSubmit(e)}>
                <i className="fa fa-plus" /> {buttonText}
            </button>
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddManufacturerForm;
