import React from 'react';

import SubmitContainer from 'components/shared/generic/form/containers/SubmitContainer.js';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const AddDrawingsForm = ({
    handleSubmit,
    drawings,
    updateDrawing,
    addDrawing,
    removeDrawing,
    handleClose,
    isUsingBolsterLabels,
    credits,
    initialOptions,
}) => {
    const hasEnoughCredits = credits >= drawings.length;
    return (
        <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
            <div className="size-lg-12">
                {drawings.map((drawing, i) => (
                    <div className="size-lg-12" key={drawing.id}>
                        <div
                            className={isUsingBolsterLabels ? 'size-lg-6 size-md-12' : 'size-lg-12'}
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
                                        acceptedTypes={['application/pdf', 'image/*']}
                                        handleChange={(name, value) => {
                                            updateDrawing(name, value, drawing.id);
                                        }}
                                    />
                                    <p className="size-lg-12">
                                        This can be changed free of charge for 24 hours after
                                        creation.
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
                                                updateDrawing(name, value, drawing.id)
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
                                                    updateDrawing(name, value, drawing.id)
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
                                                        `${drawing.id}.*.dateToSend`,
                                                        value,
                                                        drawing.id,
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

                        <div className="size-lg-12">
                            <div className="size-lg-6 size-md-12">
                                <Field
                                    labelClasses="no-capitalise"
                                    name="Set manufacturer(s) for drawing?"
                                >
                                    <CheckboxContainer
                                        checked={drawing.setManufacturersForHierarchy}
                                        name={`${drawing.id}.*.setManufacturersForHierarchy`}
                                        text=""
                                        handleChange={(name, value) =>
                                            updateDrawing(name, value, drawing.id)
                                        }
                                        disabled={drawing.isManufacturingSetAbove}
                                    />
                                </Field>
                            </div>
                        </div>

                        {drawing.setManufacturersForHierarchy && (
                            <div className="size-lg-12">
                                <Field labelClasses="no-capitalise" name="Manufacturer(s)">
                                    <CheckboxListContainer
                                        name={`${drawing.id}.*.selectedManufacturerOptions`}
                                        text=""
                                        handleChange={(name, value) =>
                                            updateDrawing(name, value, drawing.id)
                                        }
                                        selectedOptions={drawing.selectedManufacturerOptions}
                                        options={drawing.manufacturerOptions}
                                        allOptionsDisabled={drawing.isManufacturingSetAbove}
                                    />
                                </Field>
                            </div>
                        )}

                        {drawing.setManufacturersForHierarchy &&
                            Object.entries(drawing.optionValuesOptions).map(
                                ([manufacturerID, optionValues]) => {
                                    if (
                                        drawing.selectedManufacturerOptions.includes(manufacturerID)
                                    ) {
                                        const manufacturerInfo = drawing.manufacturerOptions.find(
                                            element =>
                                                String(element.id) === String(manufacturerID),
                                        );

                                        return (
                                            <div className="size-lg-12">
                                                <Field
                                                    labelClasses="no-capitalise"
                                                    name={`${manufacturerInfo.name} ${
                                                        DROPDOWN_OPTIONS[
                                                            manufacturerInfo.pinOptionType
                                                        ].name
                                                    }
                              `}
                                                >
                                                    <CheckboxListContainer
                                                        name={`${drawing.id}.*.selectedOptionValues`}
                                                        text=""
                                                        handleChange={(name, value) =>
                                                            updateDrawing(name, value, drawing.id)
                                                        }
                                                        selectedOptions={
                                                            drawing.selectedOptionValues
                                                        }
                                                        options={Object.values(optionValues)}
                                                        allOptionsDisabled={
                                                            drawing.isManufacturingSetAbove
                                                        }
                                                    />
                                                </Field>
                                            </div>
                                        );
                                    } else return null;
                                },
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
                    onClick={() => addDrawing(initialOptions)}
                >
                    <i className="fa fa-plus" /> Add another drawing
                </button>
                {hasEnoughCredits ? (
                    <SubmitContainer withPlus text={'Submit'} />
                ) : (
                    <button className="button red" type="button" onClick={() => {}}>
                        <i className="fa fa-times" />
                        Not enough credits
                    </button>
                )}
                <ButtonContainer handleClick={handleClose}>Cancel</ButtonContainer>
            </BlockButtonWrapper>
        </Form>
    );
};
export default AddDrawingsForm;
