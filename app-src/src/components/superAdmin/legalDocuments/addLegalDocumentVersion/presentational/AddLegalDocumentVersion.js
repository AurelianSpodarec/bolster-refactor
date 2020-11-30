import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
                <ReactQuill theme="snow" value={documentText} onChange={setDocText} />

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
