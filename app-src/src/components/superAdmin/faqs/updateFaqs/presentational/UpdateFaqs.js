import React from 'react';
import ReactQuill from 'react-quill';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { isEmpty } from 'helpers/generic';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'bullet' }],
        ['link'],
    ],
};

const formats = ['header', 'bold', 'italic', 'underline', 'bullet', 'link'];

const UpdateFaqs = ({
    handleUpdate,
    faqText,
    setFaqText,
    handleFormChange,
    faqTitle,
    isFetching,
    faqsSingle,
}) => {
    return (
        <>
            <PageHeading title={faqTitle} withBackButton />
            <BlockContainer isFetching={isFetching} isEmpty={isEmpty(faqsSingle)}>
                <Field name="FAQs Title" required>
                    <TextInputContainer
                        name="faqTitle"
                        value={faqTitle}
                        handleChange={handleFormChange}
                        required
                    />
                </Field>
            </BlockContainer>

            <BlockContainer>
                <ReactQuill
                    theme="snow"
                    value={faqText}
                    onChange={setFaqText}
                    modules={modules}
                    formats={formats}
                />

                <BlockButtonWrapper>
                    <button className="button green" onClick={handleUpdate}>
                        Update FAQs
                    </button>
                </BlockButtonWrapper>
            </BlockContainer>
        </>
    );
};

export default UpdateFaqs;
