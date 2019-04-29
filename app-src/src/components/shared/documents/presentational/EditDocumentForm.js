import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import { withRouter } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import DatePickerContainer from 'components/shared/documents/containers/AttachDocumentDatePickerContainer';
import FileView from 'components/shared/generic/form/presentational/FileView';
import { DOCUMENT_TYPE } from 'constants/companyAdmin/enums';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const EditDocumentForm = ({
    handleInputChange,
    handleFileChange,
    handleRadioChange,
    handleCheckboxChange,
    handleMultiselectChange,
    handleSubmit,
    handleDateChange,
    handleHide,
    handleCancelUpload,
    filesUploading,
    type,
    name,
    fileS3Key,
    isPhotoRequired,
    isFileViewRequired,
    isFileViewHidden,
    isSignatureRequired,
    isUpsyncForced,
    services,
    serviceIDs,
    agreeanceEveryXDays,
    startOn,
    endOn,
    location,
    documentID,
    file
}) => (
    <>
        <PageHeading leftChildren={true} title="Edit Document">
            <BackButtonContainer />
        </PageHeading>

        <BlockContainer>
            <BlockHeading title="Document Details" />
            <p className="generic-text intro-text size-lg-12">
                Instructions: ##Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Expedita sit quas, aliquam explicabo
                laboriosam illo. Beatae architecto, laudantium iusto iure atque
                quas ea at possimus alias iste eaque, fuga tenetur non vero
                repellat nostrum adipisci? Veniam, aspernatur quidem sed
                voluptas hic quis doloremque tempora dignissimos, incidunt natus
                perferendis, placeat possimus.##
            </p>
            <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
                <Field>
                    <RadioButton
                        name="type"
                        checked={type === '1' ? true : false}
                        text={DOCUMENT_TYPE[1]}
                        value="1"
                        handleInputChange={handleRadioChange}
                    />

                    <RadioButton
                        name="type"
                        checked={type === '2' ? true : false}
                        text={DOCUMENT_TYPE[2]}
                        value="2"
                        handleInputChange={handleRadioChange}
                    />

                    <RadioButton
                        name="type"
                        checked={type === '3' ? true : false}
                        text={DOCUMENT_TYPE[3]}
                        value="3"
                        handleInputChange={handleRadioChange}
                    />
                </Field>
                <Field name="Name of document" sizeClasses="size-lg-4">
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
                    <div className="size-lg-6">
                        {!isFileViewHidden ? (
                            <Field name="Attached file">
                                <FileView
                                    file={fileS3Key}
                                    handleHide={handleHide}
                                />
                            </Field>
                        ) : (
                            <Field name="Upload PDF or image">
                                <FileUploadContainer
                                    name="file"
                                    value={file}
                                    acceptedTypes={[
                                        'application/pdf',
                                        'image/*'
                                    ]}
                                    handleChange={handleFileChange}
                                    required
                                />
                                <ButtonContainer
                                    handleClick={handleCancelUpload}
                                >
                                    Cancel File Replace
                                </ButtonContainer>
                            </Field>
                        )}
                    </div>
                </div>
                <div className="size-lg-12">
                    <DatePickerContainer
                        startOn={startOn}
                        endOn={endOn}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="size-lg-12">
                    <Field name="Service types">
                        <CheckboxListContainer
                            required
                            name="serviceIDs"
                            handleChange={handleMultiselectChange}
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
                                <Checkbox
                                    name="isPhotoRequired"
                                    text="Requires photo"
                                    checked={isPhotoRequired}
                                    handleChange={handleCheckboxChange}
                                />
                                <Checkbox
                                    name="isFileViewRequired"
                                    text="Requires file view"
                                    checked={isFileViewRequired}
                                    handleChange={handleCheckboxChange}
                                />
                                <Checkbox
                                    name="isSignatureRequired"
                                    text="Requires signature"
                                    checked={isSignatureRequired}
                                    handleChange={handleCheckboxChange}
                                />
                                <Checkbox
                                    name="isUpsyncForced"
                                    text="Force upsync to continue"
                                    checked={isUpsyncForced}
                                    handleChange={handleCheckboxChange}
                                />
                            </div>
                        </Field>
                        {type === '3' && (
                            <div className="size-lg-12">
                                <div className="size-lg-6">
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
                    <button
                        disabled={filesUploading}
                        onClick={handleSubmit}
                        className="button green"
                    >
                        {filesUploading ? 'Please wait...' : <>{'Confirm'}</>}
                    </button>
                    <ButtonContainer
                        to={location.pathname.replace(
                            `/edit-document/${documentID}`,
                            ''
                        )}
                    >
                        Cancel
                    </ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    </>
);

export default withRouter(EditDocumentForm);
