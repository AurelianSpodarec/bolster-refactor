import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import SunEditorRichTextContainer from 'components/shared/slateRichText/container/SunEditorRichTextContainer';

const AddNewFeatureForm = ({ handleChange, handleSubmit, form }) => (
    <Form onSubmit={handleSubmit} className="generic-form">
        <Field name="Title" required>
            <TextInputContainer
                placeholder="Enter title"
                name="title"
                value={form.title}
                handleChange={handleChange}
                required
            />
        </Field>

        <Field name="Full Description" required>
            <SunEditorRichTextContainer
                name="fullDescription"
                value={form.fullDescription}
                onChange={description => handleChange('fullDescription', description)}
                placeholder="Enter a long description"
            />
        </Field>
        <Field name="Publish on" sizeClasses="w-dates size-lg-12" required>
            <DatePickerContainer
                name="publishDate"
                selected={form.publishDate}
                onChange={val => handleChange('publishDate', val)}
                placeholderText="Enter a publish date"
                showTimeSelect
                // onBlur={() => handleDateBlur(true)}
            />
        </Field>
        <BlockButtonWrapper>
            <button className="button green">Submit</button>
        </BlockButtonWrapper>
    </Form>
);

export default AddNewFeatureForm;
