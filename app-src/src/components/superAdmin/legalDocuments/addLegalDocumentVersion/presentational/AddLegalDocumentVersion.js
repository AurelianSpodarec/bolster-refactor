import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import { LEGAL_DOCUMENT_TYPE } from 'constants/superAdmin/enums';
import SunEditorRichTextContainer from 'components/shared/slateRichText/container/SunEditorRichTextContainer';

const options = [
    { text: LEGAL_DOCUMENT_TYPE[10], value: LEGAL_DOCUMENT_TYPE[10] },
    { text: LEGAL_DOCUMENT_TYPE[20], value: LEGAL_DOCUMENT_TYPE[20] },
    { text: LEGAL_DOCUMENT_TYPE[30], value: LEGAL_DOCUMENT_TYPE[30] },
];

const AddLegalDocumentVersion = ({
    handleSaveDraft,
    handlePublishDraft,
    handleBack,
    documentText,
    setDocText,
    handleFormChange,
    handleTypeChange,
    docTitle,
    docType,
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
                <Field name="Document Type" required>
                    <DropdownContainer
                        handleChange={handleTypeChange}
                        name="docType"
                        value={docType}
                        options={options}
                        withoutPlaceholder
                    />
                </Field>
            </BlockContainer>

            <BlockContainer>
                <SunEditorRichTextContainer value={documentText} onChange={setDocText} />

                <BlockButtonWrapper>
                    <ButtonContainer handleClick={handleSaveDraft}>Save Draft</ButtonContainer>
                    <ButtonContainer handleClick={handlePublishDraft}>
                        Publish Draft
                    </ButtonContainer>
                    <ButtonContainer setColour={'#d71a1a'} handleClick={handleBack}>
                        Back
                    </ButtonContainer>
                </BlockButtonWrapper>
            </BlockContainer>
        </>
    );
};

export default AddLegalDocumentVersion;
