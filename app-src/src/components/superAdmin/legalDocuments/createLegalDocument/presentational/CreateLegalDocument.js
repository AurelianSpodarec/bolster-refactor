import React from 'react';
import ReactQuill from 'react-quill';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockEditor from 'components/shared/generic/block/presentational/BlockEditor';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
];

const CreateLegalDocument = ({
    handleSaveDraft,
    handlePublishDraft,
    documentText,
    setDocText,
    handleFormChange,
    docTitle,
}) => {
    return (
        <>
            <PageHeading title={`${docTitle} (draft)`} withBackButton />
            <BlockContainer>
                <Field name="Document Title" required>
                    <TextInputContainer
                        name="docTitle"
                        value={docTitle}
                        handleChange={handleFormChange}
                        required
                    />
                </Field>
            </BlockContainer>

            <BlockEditor>
                <ReactQuill
                    theme="snow"
                    value={documentText}
                    onChange={setDocText}
                    modules={modules}
                    formats={formats}
                />

                <BlockButtonWrapper>
                    <ButtonContainer handleClick={handleSaveDraft}>
                        Save New Document
                    </ButtonContainer>
                    <ButtonContainer handleClick={handlePublishDraft}>
                        Publish New Document
                    </ButtonContainer>
                </BlockButtonWrapper>
            </BlockEditor>
        </>
    );
};

export default CreateLegalDocument;
