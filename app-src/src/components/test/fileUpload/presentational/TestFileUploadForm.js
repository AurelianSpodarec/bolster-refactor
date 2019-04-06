import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TestFileUploadContainer from '../containers/TestFileUploadContainer';

const TestFileUploadForm = ({ handleSubmit, handleChange, file }) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Upload">
                    <TestFileUploadContainer
                        required
                        name="file"
                        value={file}
                        handleChange={handleChange}
                        maxFiles={1}
                    />
                </Field>
            </div>
        </div>

        <BlockButtonWrapper>
            <button className="button green" type="submit">
                <i className="fa fa-plus" /> Submit
            </button>
        </BlockButtonWrapper>
    </Form>
);
export default TestFileUploadForm;
