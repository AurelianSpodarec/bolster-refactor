import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
// import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';

const AddDrawingForm = ({
    handleSubmit,
    handleInputChange,
    handleFileChange,
    filesUploading,
    name,
    file,
    credits,
    handleBuyCreditsModal,
    handleClose
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
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
            <div className="size-lg-6 size-md-12">
                <Field name="Upload plan" required>
                    <FileUploadContainer
                        value={file}
                        required
                        name="file"
                        acceptedTypes={['application/pdf', 'image/*']}
                        handleChange={handleFileChange}
                    />
                    <p className="size-lg-12">
                        This can be changed free of charge for 24 hours after
                        creation.
                    </p>
                </Field>
            </div>
        </div>

        {/* {isUsingBolsterLabels && <BolsterLabelExample name={name} />} */}

        <BlockButtonWrapper>
            {credits > 0 ? (
                <button
                    disabled={filesUploading}
                    className="button green"
                    type="submit"
                >
                    {filesUploading ? 'Please wait...' : <>Submit</>}
                </button>
            ) : (
                <TooltipContainer
                    side="top"
                    text="You must have credits to add a drawing. Click to buy credits."
                >
                    <button
                        onClick={handleBuyCreditsModal}
                        className="button red"
                        type="button"
                    >
                        No credits available
                    </button>
                </TooltipContainer>
            )}
            <ButtonContainer handleClick={handleClose}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddDrawingForm;
