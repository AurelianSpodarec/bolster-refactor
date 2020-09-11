import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';

export default function AddNewFeatureForm({ handleChange, handleSubmit, form }) {
    return (
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
            <Field name="Short Description" required>
                <TextInputContainer
                    placeholder="Enter a short description"
                    name="shortDescription"
                    value={form.shortDescription}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <Field name="Full Description" required>
                <TextAreaContainer
                    placeholder="Enter a long description"
                    name="fullDescription"
                    value={form.fullDescription}
                    handleChange={handleChange}
                    required
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
}
