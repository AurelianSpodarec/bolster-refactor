import React from 'react';
import ReactQuill from 'react-quill';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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

const AddLegalDocumentVersion = ({
    handleSaveDraft,
    handlePublishDraft,
    documentText,
    setDocText,
}) => {
    return (
        <>
            <PageHeading title={'document name, version, (draft)'} />
            <BlockContainer>
                <ReactQuill
                    className="wysiwyg-container"
                    theme="snow"
                    value={documentText}
                    onChange={setDocText}
                    modules={modules}
                    formats={formats}
                />

                <BlockButtonWrapper>
                    <ButtonContainer handleClick={handleSaveDraft}>Save draft</ButtonContainer>
                    <ButtonContainer handleClick={handlePublishDraft}>
                        Publish draft
                    </ButtonContainer>
                </BlockButtonWrapper>
            </BlockContainer>
        </>
    );
};

export default AddLegalDocumentVersion;
