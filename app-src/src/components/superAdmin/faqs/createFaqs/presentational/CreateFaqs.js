import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import { FAQS_PAGES } from 'constants/superAdmin/faqs';
import SunEditorSimpleWysiwyg from 'components/shared/generic/form/presentational/SunEditorSimpleWysiwyg';
import BlockEditor from 'components/shared/generic/block/presentational/BlockEditor';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const buttonOptions = [['formatBlock'], ['bold', 'italic', 'underline'], ['list']];

const CreateFaqs = ({
    handleSave,
    handleFormChange,
    form: { title, type, content, imageS3Key, videoLink, pdfS3Key, videoThumbnail },
}) => {
    return (
        <>
            <PageHeading title={title} withBackButton />
            <BlockContainer>
                <Field name="FAQ Title" required>
                    <TextInputContainer
                        name="title"
                        value={title}
                        handleChange={handleFormChange}
                        required
                    />
                </Field>
                <Field name="FAQ Type" required>
                    <DropdownContainer
                        handleChange={handleFormChange}
                        name="type"
                        value={type}
                        options={Object.keys(FAQS_PAGES).map(item => {
                            return {
                                text: FAQS_PAGES[item],
                                value: FAQS_PAGES[item],
                            };
                        })}
                        withoutPlaceholder
                    />
                </Field>

                <Field name="FAQ Content" required>
                    <BlockEditor containerClass="no-padding" contentClass="no-padding">
                        <SunEditorSimpleWysiwyg
                            value={content}
                            onChange={value => handleFormChange('content', value)}
                            name="content"
                            buttonOptions={buttonOptions}
                        />
                    </BlockEditor>
                </Field>

                <Field name="Upload video" sizeClasses="size-lg-6">
                    <TextInputContainer
                        name="videoLink"
                        value={videoLink}
                        handleChange={handleFormChange}
                        placeholder="Paste Youtube or Vimeo link"
                    />
                </Field>

                <Field name="Upload video thumbnail" sizeClasses="size-lg-6">
                    <FileUploadContainer
                        value={videoThumbnail}
                        name="videoThumbnail"
                        acceptedTypes={['image/jpg', 'image/png', 'image/jpeg']}
                        handleChange={handleFormChange}
                    />
                </Field>

                <Field name="Upload image" sizeClasses="size-lg-6">
                    <FileUploadContainer
                        value={imageS3Key}
                        name="imageS3Key"
                        acceptedTypes={['image/jpg', 'image/png', 'image/jpeg']}
                        handleChange={handleFormChange}
                    />
                </Field>
                <Field name="Upload PDF" sizeClasses="size-lg-6">
                    <FileUploadContainer
                        value={pdfS3Key}
                        name="pdfS3Key"
                        acceptedTypes={['application/pdf']}
                        handleChange={handleFormChange}
                    />
                </Field>

                <Field name="Upload PDF" sizeClasses="size-lg-6">
                    <FileUploadContainer
                        value={pdfS3Key}
                        name="pdfS3Key"
                        acceptedTypes={['application/pdf']}
                        handleChange={handleFormChange}
                    />
                </Field>

                <BlockButtonWrapper>
                    <button className="button green" onClick={handleSave}>
                        <i className="fa fa-save" />
                        Save FAQ
                    </button>
                </BlockButtonWrapper>
            </BlockContainer>
        </>
    );
};

export default CreateFaqs;
