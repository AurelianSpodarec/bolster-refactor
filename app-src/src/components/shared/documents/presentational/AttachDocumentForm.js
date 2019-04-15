import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import { Link, withRouter } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import RadioButton from 'components/shared/generic/form/presentational/RadioButton';
import DatePickerContainer from 'components/shared/documents/containers/AttachDocumentDatePickerContainer';
import { DOCUMENT_TYPE } from 'constants/companyAdmin/enums';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';

const AttachDocumentForm = ({
    handleInputChange,
    handleFileChange,
    handleRadioChange,
    handleCheckboxChange,
    handleMultiselectChange,
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
    <>
        <BlockHeading title="Document details" />
        <p className="generic-text intro-text size-lg-12">
            <strong>Instructions:</strong> ##Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Expedita sit quas, aliquam explicabo
            laboriosam illo. Beatae architecto, laudantium iusto iure atque quas
            ea at possimus alias iste eaque, fuga tenetur non vero repellat
            nostrum adipisci? Veniam, aspernatur quidem sed voluptas hic quis
            doloremque tempora dignissimos, incidunt natus perferendis, placeat
            possimus.##
        </p>
        <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
            <Field classes="large-margin">
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

            {/* is this the right way of styling this? */}
            <div className="size-lg-12">
                <div className="size-lg-6">
                    <Field name="Upload PDF or image">
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
                    required
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
                <button disabled={filesUploading} className="button green">
                    {filesUploading ? (
                        'Please wait...'
                    ) : (
                        <>
                            <i className="fa fa-plus" />
                            Attach Document
                        </>
                    )}
                </button>
                <Link
                    to={location.pathname.replace('/attach-document', '')}
                    className="button"
                >
                    Cancel
                </Link>
            </BlockButtonWrapper>
        </Form>
    </>
);

export default withRouter(AttachDocumentForm);
