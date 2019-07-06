import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import { withRouter } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import DatePickerContainer from 'components/shared/documents/containers/AttachDocumentDatePickerContainer';
import { DOCUMENT_TYPE } from 'constants/companyAdmin/enums';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import SubmitContainer from 'components/shared/generic/form/containers/SubmitContainer';

const AttachDocumentForm = ({
    handleInputChange,
    handleFileChange,
    handleCheckboxChange,
    handleSubmit,
    handleDateChange,
    filesUploading,
    type,
    name,
    isPhotoRequired,
    isFileViewRequired,
    isSignatureRequired,
    isUpsyncForced,
    services,
    serviceIDs,
    agreeanceEveryXDays,
    startOn,
    endOn,
    location,
    file
}) => (
    <BlockContainer>
        <BlockHeading title="Document details" />

        <p className="generic-text size-lg-12">
            {
                'Documents will be available for operatives to view on the mobile app. An attached document will appear to operatives with access to this location, once they have downsynced. If an operative is required to respond to the document before proceeding, select \'Requires agreement\'. Additionally, if an operative is required to respond periodically, select the multiple option and you will be able to specify a frequency.'
            }
        </p>

        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <Field name="Document Type" sizeClasses="size-lg-12" required>
                <RadioButton
                    name="type"
                    checked={type === '1' ? true : false}
                    text={DOCUMENT_TYPE[1]}
                    value="1"
                    handleInputChange={handleInputChange}
                />

                <RadioButton
                    name="type"
                    checked={type === '2' ? true : false}
                    text={DOCUMENT_TYPE[2]}
                    value="2"
                    handleInputChange={handleInputChange}
                />

                <RadioButton
                    name="type"
                    checked={type === '3' ? true : false}
                    text={DOCUMENT_TYPE[3]}
                    value="3"
                    handleInputChange={handleInputChange}
                />
            </Field>

            <Field
                name="Name of document"
                sizeClasses="size-lg-4 size-md-12"
                required
            >
                <TextInputContainer
                    value={name}
                    name="name"
                    type="text"
                    handleChange={handleInputChange}
                    required
                    placeholder="Document name..."
                />
            </Field>

            <div className="size-lg-12">
                <div className="size-lg-6 size-md-12">
                    <Field name="Upload PDF or image" required>
                        <FileUploadContainer
                            name="file"
                            acceptedTypes={['application/pdf', 'image/*']}
                            handleChange={handleFileChange}
                            required
                            value={file}
                        />
                    </Field>
                </div>
            </div>
            <div className="size-lg-12">
                <DatePickerContainer
                    startOn={startOn}
                    endOn={endOn}
                    onChange={handleDateChange}
                    name="Date Picker"
                    startRequired
                />
            </div>
            <div className="size-lg-12">
                <Field name="Service types" required>
                    <CheckboxListContainer
                        required
                        name="serviceIDs"
                        handleChange={handleInputChange}
                        options={services}
                        selectedOptions={serviceIDs}
                        requiredMessage="Please select at least one service."
                    />
                </Field>
            </div>
            {type !== '1' && (
                <>
                    <Field name="Options">
                        <div className="checkbox-list size-lg-12">
                            <CheckboxContainer
                                name="isPhotoRequired"
                                text="Requires photo"
                                checked={isPhotoRequired}
                                handleChange={handleCheckboxChange}
                            />
                            <CheckboxContainer
                                name="isFileViewRequired"
                                text="Requires file view"
                                checked={isFileViewRequired}
                                handleChange={handleCheckboxChange}
                            />
                            <CheckboxContainer
                                name="isSignatureRequired"
                                text="Requires signature"
                                checked={isSignatureRequired}
                                handleChange={handleCheckboxChange}
                            />
                            <CheckboxContainer
                                name="isUpsyncForced"
                                text="Force upsync to continue"
                                checked={isUpsyncForced}
                                handleChange={handleCheckboxChange}
                            />
                        </div>
                    </Field>
                    {type === '3' && (
                        <div className="size-lg-12">
                            <div className="size-lg-6 size-md-12">
                                <Field name="Agreeance frequency (days)">
                                    <TextInputContainer
                                        name="agreeanceEveryXDays"
                                        type="number"
                                        value={agreeanceEveryXDays}
                                        handleChange={handleInputChange}
                                    />
                                </Field>
                            </div>
                        </div>
                    )}
                </>
            )}
            <BlockButtonWrapper>
                <SubmitContainer text="Attach Document" withPlus />
                <ButtonContainer
                    to={location.pathname.replace('/attach-document', '')}
                >
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    </BlockContainer>
);

export default withRouter(AttachDocumentForm);
