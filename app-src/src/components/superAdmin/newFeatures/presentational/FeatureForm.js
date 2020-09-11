import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

export default function AddNewFeatureForm({ handleChange, handleSubmit, form }) {
    return (
        <Form onSubmit={handleSubmit} className="generic-form">
            <Field name="Enter Title" required>
                <TextInputContainer
                    placeholder="Enter title of the new feature"
                    name="title"
                    value={form.title}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <Field name="Enter Short Description" required>
                <TextInputContainer
                    placeholder="Enter a short description of the new feature"
                    name="shortDescription"
                    value={form.shortDescription}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <Field name="Enter Full Description" required>
                <TextInputContainer
                    placeholder="Enter a long description of the new feature"
                    name="fullDescription"
                    value={form.fullDescription}
                    handleChange={handleChange}
                    required
                />
            </Field>
            <Field name="Date range" sizeClasses="w-dates size-lg-12" required>
                <DatePickerContainer
                    name="publishDate"
                    selected={form.publishDate}
                    onChange={val => handleChange('publishDate', val)}
                    placeholderText="Publish Date"
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
