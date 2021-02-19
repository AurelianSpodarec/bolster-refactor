import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockEditor from 'components/shared/generic/block/presentational/BlockEditor';
import SunEditorSimpleWysiwyg from 'components/shared/generic/form/presentational/SunEditorSimpleWysiwyg';
import { legalDocumentsButtons, legalDocumentsFormats } from 'constants/shared/editorFormats';

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
                <SunEditorSimpleWysiwyg
                    name=""
                    value={documentText}
                    onChange={setDocText}
                    buttonOptions={legalDocumentsButtons}
                    formatOptions={legalDocumentsFormats}
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
