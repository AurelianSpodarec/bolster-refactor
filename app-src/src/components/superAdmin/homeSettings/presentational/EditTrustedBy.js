import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

const EditTrustedBy = ({ values, handleTextChange, handleUploadChange, handleSubmit }) => {
    console.log('values', values);
    return (
        <div className="trusted-by-settings-container">
            <div className="trusted-by-grid">
                {Array(5)
                    .fill(0)
                    .map((item, index) => (
                        <Form
                            key={index}
                            onSubmit={handleSubmit}
                            className={`generic-form trustedBy${index}`}
                        >
                            <div className="key">Order: {index + 1}</div>
                            <Field name="Image">
                                <FileUploadContainer
                                    name={`trustedBy${index}`}
                                    value={values[`trustedBy${index}`].file}
                                    handleChange={handleUploadChange}
                                    acceptedTypes={['image/*']}
                                    maxFiles={1}
                                />
                            </Field>
                            <Field name="Name">
                                <TextInputContainer
                                    name={`trustedBy${index}`}
                                    value={values[`trustedBy${index}`].name}
                                    handleChange={handleTextChange}
                                />
                            </Field>
                            <BlockButtonWrapper>
                                <button
                                    disabled={!values[`trustedBy${index}`].file}
                                    className="button green"
                                >
                                    <i className="fa fa-plus" /> Save
                                </button>
                            </BlockButtonWrapper>
                        </Form>
                    ))}
            </div>
        </div>
    );
};

export default EditTrustedBy;
