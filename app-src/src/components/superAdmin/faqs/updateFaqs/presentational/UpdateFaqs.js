import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockEditor from 'components/shared/generic/block/presentational/BlockEditor';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import SunEditorSimpleWysiwyg from 'components/shared/generic/form/presentational/SunEditorSimpleWysiwyg';
import { isObjEmpty } from 'helpers/generic';

const buttonOptions = [['formatBlock'], ['bold', 'italic', 'underline'], ['list']];

const UpdateFaqs = ({
    handleSave,
    handleFormChange,
    form: { title, content, imageS3Key, videoLink },
    isFetching,
    faqSingle,
}) => {
    return (
        <>
            <PageHeading title={title} withBackButton />
            <BlockContainer isFetching={isFetching} isEmpty={isObjEmpty(faqSingle)}>
                <Field name="FAQ Title" required>
                    <TextInputContainer
                        name="title"
                        value={title}
                        handleChange={handleFormChange}
                        required
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
                <Field name="Upload image" sizeClasses="size-lg-6">
                    <FileUploadContainer
                        value={imageS3Key}
                        name="imageS3Key"
                        acceptedTypes={['image/jpg', 'image/png', 'image/jpeg']}
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

export default UpdateFaqs;
