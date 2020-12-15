import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DatePicker from 'components/shared/generic/form/presentational/DatePicker';
import SunEditorSimpleWysiwyg from 'components/shared/generic/form/presentational/SunEditorSimpleWysiwyg';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import ReactQuill from 'react-quill';

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

const BannerNotificationForm = ({
    formData: { name, content, startDate, endDate, colour },
    handleChange,
    handleSubmit,
    colourOptions,
    handleColourChange,
}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Field name="Banner Name">
                <TextInputContainer name="name" value={name} handleChange={handleChange} />
            </Field>
            <Field name="Banner Content">
                {/* <SunEditorSimpleWysiwyg
                    name="content"
                    onChange={content => handleChange('content', content)}
                    value={content}
                /> */}
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={content => handleChange('content', content)}
                    modules={modules}
                    formats={formats}
                />
            </Field>
            <Field name="Start Date">
                <DatePicker
                    name="startDate"
                    selected={startDate}
                    onChange={val => handleChange('startDate', val)}
                    placeholderText="Start Date"
                />
            </Field>
            <Field name="End Date">
                <DatePicker
                    name="endDate"
                    selected={endDate}
                    onChange={val => handleChange('endDate', val)}
                    placeholderText="End Date"
                />
            </Field>
            <Field name="Banner Colour">
                <DropdownContainer
                    placeholder="Select Colour"
                    name="colour"
                    options={colourOptions}
                    selectedOption={colour}
                    handleChange={handleColourChange}
                />
            </Field>
            <BlockButtonWrapper>
                <button type="submit" className="button green">
                    <i className="fa fa-check" />
                    Submit Banner
                </button>
            </BlockButtonWrapper>
        </Form>
    );
};

export default BannerNotificationForm;
