import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import { LEGAL_DOCUMENT_TYPE } from 'constants/superAdmin/enums';
import ReactQuill from 'react-quill';
import BlockEditor from 'components/shared/generic/block/presentational/BlockEditor';

const options = [
    { text: LEGAL_DOCUMENT_TYPE[10], value: LEGAL_DOCUMENT_TYPE[10] },
    { text: LEGAL_DOCUMENT_TYPE[20], value: LEGAL_DOCUMENT_TYPE[20] },
    { text: LEGAL_DOCUMENT_TYPE[30], value: LEGAL_DOCUMENT_TYPE[30] },
];

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

            <BlockEditor>
                <ReactQuill
                    theme="snow"
                    value={documentText}
                    onChange={setDocText}
                    modules={modules}
                    formats={formats}
                />

                <BlockButtonWrapper>
                    <ButtonContainer handleClick={handleSaveDraft}>Save Draft</ButtonContainer>
                    <ButtonContainer handleClick={handlePublishDraft}>
                        Publish Draft
                    </ButtonContainer>
                    <ButtonContainer setColour={'#d71a1a'} handleClick={handleBack}>
                        Back
                    </ButtonContainer>
                </BlockButtonWrapper>
            </BlockEditor>
        </>
    );
};

export default AddLegalDocumentVersion;
