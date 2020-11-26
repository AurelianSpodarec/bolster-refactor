import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DatePicker from 'components/shared/generic/form/presentational/DatePicker';

const BannerNotificationForm = ({
    formData: { name, content, startDate, endDate, colour },
    handleChange,
    handleSubmit,
}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Field name="Banner Name">
                <TextInputContainer name="name" value={name} handleChange={handleChange} />
            </Field>
            <Field name="Banner Content">
                <TextInputContainer name="content" value={content} handleChange={handleChange} />
            </Field>
            <Field name="Start Date">
                <DatePicker
                    name="startDate"
                    selected={startDate}
                    onChange={val => handleChange('startDate', val)}
                    showTimeSelect
                    placeholderText="Start Date"
                />
            </Field>
            <Field name="End Date">
                <DatePicker
                    name="endDate"
                    selected={endDate}
                    onChange={val => handleChange('endDate', val)}
                    showTimeSelect
                    placeholderText="End Date"
                />
            </Field>
            <Field name="Banner Colour">
                <TextInputContainer name="colour" value={colour} handleChange={handleChange} />
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
