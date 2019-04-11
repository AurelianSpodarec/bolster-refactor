import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import SwitchContainer from 'components/shared/generic/form/containers/SwitchContainer';
import { Link, withRouter } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import DatePickerContainer from 'components/shared/documents/containers/AttachDocumentDatePickerContainer';
import FileView from 'components/shared/generic/form/presentational/FileView';
import { DOCUMENT_TYPE } from 'constants/companyAdmin/enums';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

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
    <Form className="content-area size-lg-12" onSubmit={handleSubmit}>
        <h1 className="heading heading-3">Edit Document</h1>
        <p>
            Instructions: ##Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Expedita sit quas, aliquam explicabo laboriosam illo. Beatae
            architecto, laudantium iusto iure atque quas ea at possimus alias
            iste eaque, fuga tenetur non vero repellat nostrum adipisci? Veniam,
            aspernatur quidem sed voluptas hic quis doloremque tempora
            dignissimos, incidunt natus perferendis, placeat possimus.##
        </p>
        <div className="size-lg-12">
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
        </div>
        <Field name="Name of document" sizeClasses="size-lg-4">
            <TextInputContainer
                value={name}
                name="name"
                type="text"
                handleChange={handleInputChange}
                required
                placeholder="document name..."
            />
        </Field>

        {/* is this the right way of styling this? */}
        <div className="size-lg-12">
            <div className="size-lg-6">
                {!isFileViewHidden ? (
                    <Field name="Attached file">
                        <FileView file={fileS3Key} handleHide={handleHide} />
                    </Field>
                ) : (
                    <Field name="Upload PDF or image">
                        <FileUploadContainer
                            name="file"
                            value={file}
                            acceptedTypes={['application/pdf', 'image/*']}
                            handleChange={handleFileChange}
                            required
                        />
                        <button className="button" onClick={handleCancelUpload}>
                            Cancel File Replace
                        </button>
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
                />
            </Field>
        </div>
        {type !== '1' && (
            <>
                <Field name="Options">
                    <SwitchContainer
                        checked={isPhotoRequired}
                        handleChange={handleCheckboxChange}
                        name="isPhotoRequired"
                        text="Requires photo"
                    />
                    <SwitchContainer
                        checked={isFileViewRequired}
                        handleChange={handleCheckboxChange}
                        name="isFileViewRequired"
                        text="Requires file view"
                    />
                    <SwitchContainer
                        checked={isSignatureRequired}
                        handleChange={handleCheckboxChange}
                        name="isSignatureRequired"
                        text="Requires signature"
                    />
                    <SwitchContainer
                        checked={isUpsyncForced}
                        handleChange={handleCheckboxChange}
                        name="isUpsyncForced"
                        text="Force upsync to continue"
                    />
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
                {filesUploading ? (
                    'Please wait...'
                ) : (
                    <>
                        <i className="fa fa-plus" /> {'Confirm Changes'}
                    </>
                )}
            </button>
            <Link
                to={location.pathname.replace(
                    `/edit-document/${documentID}`,
                    ''
                )}
                className="button"
            >
                <i className="fa fa-times" /> Cancel
            </Link>
        </BlockButtonWrapper>
    </Form>
);

export default withRouter(EditDocumentForm);
