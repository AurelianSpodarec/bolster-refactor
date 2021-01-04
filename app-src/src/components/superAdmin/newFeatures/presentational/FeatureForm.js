import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
// import SunEditorRichTextContainer from 'components/shared/slateRichText/container/SunEditorRichTextContainer';
import ReactQuill from 'react-quill';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

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

const AddNewFeatureForm = ({
    handleChange,
    handleSubmit,
    form,
    showVideoField,
    showImageField,
    handleCheckboxChange,
    showDateSelect,
    formType,
}) => (
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
            <ReactQuill
                theme="snow"
                value={form.fullDescription}
                onChange={description => handleChange('fullDescription', description)}
                modules={modules}
                formats={formats}
                className="new-feature-quill"
            />
            {/* <SunEditorRichTextContainer
                name="fullDescription"
                value={form.fullDescription}
                onChange={description => handleChange('fullDescription', description)}
                placeholder="Enter a description"
            /> */}
        </Field>
        {!showImageField && (
            <Field classes="small-height">
                <CheckboxContainer
                    checked={showVideoField}
                    handleChange={(name, value) => handleCheckboxChange(name, value)}
                    name="videoLink"
                    text="Video link?"
                />
            </Field>
        )}
        {showVideoField && !form.image && (
            <Field name="Video link" required>
                <TextInputContainer
                    placeholder="Enter Youtube or Vimeo link"
                    name="videoLink"
                    value={form.videoLink}
                    handleChange={handleChange}
                    required
                />
            </Field>
        )}
        {!showVideoField && (
            <Field classes="small-height">
                <CheckboxContainer
                    checked={showImageField}
                    handleChange={handleCheckboxChange}
                    name="image"
                    text="Upload image?"
                />
            </Field>
        )}
        {showImageField && !form.videoLink && (
            <Field name="Upload image" required>
                <FileUploadContainer
                    value={form.image}
                    required
                    name="image"
                    acceptedTypes={['application/pdf', 'image/*']}
                    handleChange={(name, value) => {
                        handleChange(name, value, form.name);
                    }}
                />
            </Field>
        )}
        {formType !== 'edit' && (
            <Field classes="small-height">
                <CheckboxContainer
                    checked={showDateSelect}
                    handleChange={handleCheckboxChange}
                    name="publishDate"
                    text="Set date?"
                />
            </Field>
        )}
        {showDateSelect && (
            <Field name="Publish on" sizeClasses="w-dates size-lg-12">
                <DatePickerContainer
                    name="publishDate"
                    selected={form.publishDate}
                    onChange={val => handleChange('publishDate', val)}
                    placeholderText="Enter a publish date"
                    showTimeSelect
                    minDate={Date.now()}
                />
            </Field>
        )}
        <BlockButtonWrapper>
            <button className="button green">Submit</button>
        </BlockButtonWrapper>
    </Form>
);

export default AddNewFeatureForm;
