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
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const EditDocumentForm = ({
    handleInputChange,
    handleSubmit,
    handleDateChange,
    handleHide,
    handleCancelUpload,
    filesUploading,
    type,
    name,
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
        <PageHeading leftChildren={true} title="Edit Document" withBackButton />

        <BlockContainer>
            <BlockHeading title="Document Details" />
            <p className="generic-text intro-text size-lg-12">
                Instructions: ##Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
                sit quas, aliquam explicabo laboriosam illo. Beatae architecto, laudantium iusto
                iure atque quas ea at possimus alias iste eaque, fuga tenetur non vero repellat
                nostrum adipisci? Veniam, aspernatur quidem sed voluptas hic quis doloremque tempora
                dignissimos, incidunt natus perferendis, placeat possimus.##
            </p>
            <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
                <Field>
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
                <Field name="Name of document" sizeClasses="size-lg-4 size-md-12" required>
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
                                value={file}
                                acceptedTypes={['application/pdf', 'image/*']}
                                handleChange={handleInputChange}
                                required
                            />
                        </Field>
                    </div>
                </div>
                <div className="size-lg-12">
                    <DatePickerContainer
                        startOn={startOn}
                        endOn={endOn}
                        onChange={handleDateChange}
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
                                    handleChange={handleInputChange}
                                />
                                <CheckboxContainer
                                    name="isFileViewRequired"
                                    text="Requires file view"
                                    checked={isFileViewRequired}
                                    handleChange={handleInputChange}
                                />
                                <CheckboxContainer
                                    name="isSignatureRequired"
                                    text="Requires signature"
                                    checked={isSignatureRequired}
                                    handleChange={handleInputChange}
                                />
                                <CheckboxContainer
                                    name="isUpsyncForced"
                                    text="Force upsync to continue"
                                    checked={isUpsyncForced}
                                    handleChange={handleInputChange}
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
                    <button
                        disabled={filesUploading}
                        onClick={handleSubmit}
                        className="button green"
                    >
                        {filesUploading ? 'Please wait...' : <>{'Confirm'}</>}
                    </button>
                    <ButtonContainer
                        to={location.pathname.replace(`/edit-document/${documentID}`, '')}
                    >
                        Cancel
                    </ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </BlockContainer>
    </>
);

export default withRouter(EditDocumentForm);
