import React from 'react';

import SubmitContainer from 'components/shared/generic/form/containers/SubmitContainer.js';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const AddDrawingsForm = ({
    handleSubmit,
    drawings,
    updateDrawing,
    addDrawing,
    removeDrawing,
    handleClose,
    isUsingBolsterLabels,
    filesUploading
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            {drawings.map((drawing, i) => (
                <div className="size-lg-12" key={drawing.id}>
                    <div
                        className={
                            isUsingBolsterLabels
                                ? 'size-lg-6 size-md-12'
                                : 'size-lg-12'
                        }
                    >
                        <div className="size-lg-12" key={drawing.id}>
                            <Field name="Drawing name" required>
                                <TextInputContainer
                                    name={`${drawing.id}.*.name`}
                                    value={drawing.name}
                                    handleChange={(name, value) =>
                                        updateDrawing(name, value, drawing.id)
                                    }
                                    required
                                />
                            </Field>
                        </div>
                        <div className="size-lg-12">
                            <Field name="Upload plan" required>
                                <FileUploadContainer
                                    value={drawing.file}
                                    required
                                    name={`${drawing.id}.*.file`}
                                    acceptedTypes={[
                                        'application/pdf',
                                        'image/*'
                                    ]}
                                    handleChange={(name, file) => {
                                        updateDrawing(
                                            name,
                                            drawing.file ? '' : file,
                                            drawing.id
                                        );
                                    }}
                                />
                                <p className="size-lg-12">
                                    This can be changed free of charge for 24
                                    hours after creation.
                                </p>
                            </Field>
                        </div>

                        <div className="size-lg-12">
                            <div className="size-lg-6 size-md-12">
                                <Field name="Send an alert?">
                                    <CheckboxContainer
                                        checked={drawing.isAlertShowing}
                                        name={`${drawing.id}.*.isAlertShowing`}
                                        text=""
                                        handleChange={(name, value) =>
                                            updateDrawing(
                                                name,
                                                value,
                                                drawing.id
                                            )
                                        }
                                    />
                                </Field>
                            </div>
                        </div>

                        {drawing.isAlertShowing && (
                            <div className="size-lg-12">
                                <div className="size-lg-12">
                                    <Field name="Alert Message">
                                        <TextAreaContainer
                                            value={drawing.message}
                                            name={`${drawing.id}.*.message`}
                                            handleChange={(name, value) =>
                                                updateDrawing(
                                                    name,
                                                    value,
                                                    drawing.id
                                                )
                                            }
                                        />
                                    </Field>
                                </div>

                                <div className="size-lg-12">
                                    <Field name="Date to send">
                                        <DatePickerPresentational
                                            name={`${drawing.id}.*.dateToSend`}
                                            selected={drawing.dateToSend}
                                            onChange={value =>
                                                updateDrawing(
                                                    `${
                                                        drawing.id
                                                    }.*.dateToSend`,
                                                    value,
                                                    drawing.id
                                                )
                                            }
                                            placeholderText="Date"
                                            showTimeSelect
                                        />
                                    </Field>
                                </div>
                            </div>
                        )}
                    </div>
                    {isUsingBolsterLabels && (
                        <div className="size-lg-6 size-md-12">
                            <BolsterLabelExample
                                name={drawing.name}
                                hierarchy="Drawing"
                            />
                        </div>
                    )}

                    {drawings.length > 1 && (
                        <BlockButtonWrapper>
                            <button
                                className="button red icon-only"
                                type="button"
                                onClick={() => removeDrawing(drawing.id)}
                            >
                                <i className="fa fa-trash" />
                            </button>
                        </BlockButtonWrapper>
                    )}
                </div>
            ))}
        </div>
        <BlockButtonWrapper>
            <button
                className="button blue left"
                type="button"
                onClick={addDrawing}
            >
                <i className="fa fa-plus" /> Add another drawing
            </button>

            <SubmitContainer
                withPlus
                text={`Save Drawing${drawings.length > 1 ? 's' : ''}`}
            />
            <ButtonContainer handleClick={handleClose}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default AddDrawingsForm;
