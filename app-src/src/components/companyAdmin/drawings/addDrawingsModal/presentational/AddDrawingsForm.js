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
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

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
    setShowManufacturingOptions,
    showManufacturingOptions,
    clientOptions,
    operativeOptions,
    showDropdownOptions,
    setShowDropdownOptions,
    floorName,
    combinedOptions,
    initialDropdownOptions,
}) => {
    const hasEnoughCredits = credits >= drawings.length;
    return (
        <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
            <div className="size-lg-12">
                {drawings.map((drawing, i) => {
                    return (
                        <div className="size-lg-12" key={drawing.id}>
                            <div
                                className={
                                    isUsingBolsterLabels ? 'size-lg-6 size-md-12' : 'size-lg-12'
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
                            {!!clientOptions.length && (
                                <div className="size-lg-12 check-col-6">
                                    <Field name="These clients have access to drawings on this level - invite them to this drawing?">
                                        <CheckboxListContainer
                                            options={clientOptions}
                                            name={`${drawing.id}.*.clientPermissionIDs`}
                                            selectedOptions={drawing.clientPermissionIDs}
                                            handleChange={(name, value) =>
                                                updateDrawing(name, value, drawing.id)
                                            }
                                        />
                                    </Field>
                                </div>
                            )}
                            {!!operativeOptions.length && (
                                <div className="size-lg-12 check-col-6">
                                    <Field name="These operatives have access to drawings on this level - attach them to this drawing?">
                                        <CheckboxListContainer
                                            options={operativeOptions}
                                            name={`${drawing.id}.*.operativePermissionIDs`}
                                            selectedOptions={drawing.operativePermissionIDs}
                                            handleChange={(name, value) =>
                                                updateDrawing(name, value, drawing.id)
                                            }
                                        />
                                    </Field>
                                </div>
                            )}
                            {showManufacturingOptions ? (
                                <>
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
                                                    disabled={drawing.isManufacturingInherited}
                                                />
                                            </Field>
                                        </div>
                                    </div>

                                    {drawing.setManufacturersForHierarchy && (
                                        <div className="size-lg-12">
                                            <Field
                                                labelClasses="no-capitalise"
                                                name="Manufacturer(s)"
                                                required={drawing.setManufacturersForHierarchy}
                                            >
                                                <CheckboxListContainer
                                                    name={`${drawing.id}.*.selectedManufacturerOptions`}
                                                    text=""
                                                    handleChange={(name, value) =>
                                                        updateDrawing(name, value, drawing.id)
                                                    }
                                                    selectedOptions={
                                                        drawing.selectedManufacturerOptions
                                                    }
                                                    options={initialOptions.manufacturerOptions}
                                                    allOptionsDisabled={
                                                        drawing.isManufacturingInherited
                                                    }
                                                    required={drawing.setManufacturersForHierarchy}
                                                />
                                            </Field>
                                        </div>
                                    )}

                                    {drawing.setManufacturersForHierarchy &&
                                        initialOptions.manufacturerOptions
                                            .filter(man =>
                                                drawing.selectedManufacturerOptions.includes(
                                                    `${man.id}`,
                                                ),
                                            )
                                            .map(man => {
                                                return (
                                                    <div className="size-lg-12" key={man.id}>
                                                        <Field
                                                            labelClasses="no-capitalise"
                                                            name={`${man.name} ${
                                                                DROPDOWN_OPTIONS[man.pinOptionType]
                                                                    .name
                                                            }

`}
                                                            required
                                                        >
                                                            <CheckboxListContainer
                                                                name={`${drawing.id}.*.selectedOptionValues`}
                                                                text=""
                                                                handleChange={(name, value) =>
                                                                    updateDrawing(
                                                                        name,
                                                                        value,
                                                                        drawing.id,
                                                                    )
                                                                }
                                                                selectedOptions={
                                                                    drawing.selectedOptionValues
                                                                }
                                                                options={
                                                                    initialOptions
                                                                        .optionValuesOptions[
                                                                        man.id
                                                                    ] || []
                                                                }
                                                                allOptionsDisabled={
                                                                    drawing.isManufacturingInherited
                                                                }
                                                                required
                                                            />
                                                        </Field>
                                                    </div>
                                                );
                                            })}
                                </>
                            ) : (
                                <FieldOutput fieldClass="center-align">
                                    <div className="form-field size-lg-12">
                                        <p>
                                            Manufacturers already set at{' '}
                                            {initialOptions.manufacturingInheritedFrom}.
                                            <br /> This cannot be overridden at this level, click{' '}
                                            <span
                                                onClick={() => {
                                                    setShowManufacturingOptions(true);
                                                }}
                                            >
                                                here
                                            </span>{' '}
                                            to see the settings.
                                        </p>
                                    </div>
                                </FieldOutput>
                            )}
                            {showDropdownOptions ? (
                                <>
                                    <div className="size-lg-12">
                                        <div className="size-lg-6 size-md-12">
                                            <Field
                                                labelClasses="no-capitalise"
                                                name="Set item types for drawing?"
                                            >
                                                <CheckboxContainer
                                                    checked={drawing.setDropdownOptionsForHierarchy}
                                                    name={`${drawing.id}.*.setDropdownOptionsForHierarchy`}
                                                    text=""
                                                    handleChange={(name, value) =>
                                                        updateDrawing(name, value, drawing.id)
                                                    }
                                                    disabled={drawing.isDropdownOptionsInherited}
                                                />
                                            </Field>
                                        </div>
                                    </div>
                                    {drawing.setDropdownOptionsForHierarchy && (
                                        <div className="size-lg-12">
                                            <Field
                                                labelClasses="no-capitalise"
                                                name="Manufacturer(s)"
                                                required={drawing.setDropdownOptionsForHierarchy}
                                            >
                                                <CheckboxListContainer
                                                    name={`${drawing.id}.*.selectedDropdownOptions`}
                                                    text=""
                                                    handleChange={(name, value) =>
                                                        updateDrawing(name, value, drawing.id)
                                                    }
                                                    selectedOptions={
                                                        drawing.selectedDropdownOptions
                                                    }
                                                    options={Object.values(drawing.dropdownOptions)}
                                                    allOptionsDisabled={
                                                        drawing.isDropdownOptionsInherited
                                                    }
                                                    required={
                                                        drawing.setDropdownOptionsForHierarchy
                                                    }
                                                />
                                            </Field>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <FieldOutput fieldClass="center-align">
                                        <div className="form-field size-lg-12">
                                            <p>
                                                Item types already set at{' '}
                                                {
                                                    initialDropdownOptions.isDropDownOptionsInheritedFrom
                                                }
                                                .
                                                <br /> This cannot be overridden at this level,
                                                click{' '}
                                                <span
                                                    onClick={() => {
                                                        setShowDropdownOptions(true);
                                                    }}
                                                >
                                                    here
                                                </span>{' '}
                                                to see the settings.
                                            </p>
                                        </div>
                                    </FieldOutput>
                                </>
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
                    );
                })}
            </div>
            <BlockButtonWrapper>
                <button
                    className="button blue left"
                    type="button"
                    onClick={() => addDrawing(combinedOptions)}
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
