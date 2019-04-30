import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const AddDrawingForm = ({
    handleSubmit,
    handleInputChange,
    handleFileChange,
    hideModal,
    filesUploading,
    name,
    file,
    templateUsageRules,
    selectedRule,
    credits
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Drawing Name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Upload plan" required>
                    <FileUploadContainer
                        value={file}
                        required
                        name="file"
                        acceptedTypes={['application/pdf', 'image/*']}
                        handleChange={handleFileChange}
                    />
                </Field>
            </div>
        </div>
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Set Template Usage Rule" required>
                    <DropdownContainer
                        placeholder="-- select rule --"
                        name="templateUsageRule"
                        options={templateUsageRules}
                        selectedOption={selectedRule}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>

        <BlockButtonWrapper>
            {credits > 0 ? (
                <button
                    disabled={filesUploading}
                    className="button green"
                    type="submit"
                >
                    {filesUploading ? (
                        'Please wait...'
                    ) : (
                        <>
                            <i className="fa fa-plus" /> Add Drawing
                        </>
                    )}
                </button>
            ) : (
                <TooltipContainer
                    side="top"
                    text="You must have credits to add a drawing."
                >
                    <button disabled className="button red">
                        No credits available
                    </button>
                </TooltipContainer>
            )}
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddDrawingForm;
