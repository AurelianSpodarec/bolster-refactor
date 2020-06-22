import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const AddManufacturerForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    buttonText,
    name,
    validateName,
    serviceOptions,
    serviceIDs,
    showAddDocumentForm,
    handleShowAddDocForm,
    docName,
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
            <Field name="Add document">
                <CheckboxContainer
                    checked={showAddDocumentForm}
                    name="showAddDocumentForm"
                    value={showAddDocumentForm}
                    handleChange={handleShowAddDocForm}
                />{' '}
            </Field>
        </div>
        {showAddDocumentForm && (
            <div className="size-lg-12">
                <div className="size-lg-6 size-md-12">
                    <Field name="Document Name" required>
                        <TextInputContainer
                            name="docName"
                            value={docName}
                            handleChange={handleInputChange}
                            required
                        />
                    </Field>
                </div>
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
        )}
        <BlockButtonWrapper>
            <button className="button green">
                <i className="fa fa-plus" /> {buttonText}
            </button>
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddManufacturerForm;
