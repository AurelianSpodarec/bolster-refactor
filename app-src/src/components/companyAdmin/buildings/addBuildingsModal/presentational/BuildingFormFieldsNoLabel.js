import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const BuildingFormFieldsWithLabel = ({
    buildings,
    updateBuilding,
    removeBuilding,
    showManufacturingOptions,
    setShowManufacturingOptions,
    siteName,
    showDropdownOptions,
    setShowDropdownOptions,
    handleShowOandMModal,
}) =>
    buildings.map(building => {
        return (
            <div key={building.id} className="size-lg-12">
                <div className="size-lg-6 size-md-12">
                    <div className="size-lg-12">
                        <Field name="Building name" required>
                            <TextInputContainer
                                name={`${building.id}.*.name`}
                                value={building.name}
                                handleChange={(name, value) =>
                                    updateBuilding(name, value, building.id)
                                }
                                required
                            />
                        </Field>
                    </div>
                    <div className="size-lg-12">
                        <Field name="Location">
                            <TextInputContainer
                                value={building.location}
                                name={`${building.id}.*.location`}
                                handleChange={(name, value) =>
                                    updateBuilding(name, value, building.id)
                                }
                            />
                        </Field>
                    </div>

                    <div className="size-lg-12">
                        <div className="size-lg-6 size-md-12">
                            <Field name="Send an alert?">
                                <CheckboxContainer
                                    checked={building.isAlertShowing}
                                    name={`${building.id}.*.isAlertShowing`}
                                    text=""
                                    handleChange={(name, value) =>
                                        updateBuilding(name, value, building.id)
                                    }
                                />
                            </Field>
                        </div>
                    </div>

                    {building.isAlertShowing && (
                        <div className="size-lg-12">
                            <div className="size-lg-12">
                                <Field name="Alert Message">
                                    <TextAreaContainer
                                        value={building.message}
                                        name={`${building.id}.*.message`}
                                        handleChange={(name, value) =>
                                            updateBuilding(name, value, building.id)
                                        }
                                    />
                                </Field>
                            </div>

                            <div className="size-lg-12">
                                <Field name="Date to send">
                                    <DatePickerPresentational
                                        name={`${building.id}.*.dateToSend`}
                                        selected={building.dateToSend}
                                        onChange={value =>
                                            updateBuilding(
                                                `${building.id}.*.dateToSend`,
                                                value,
                                                building.id,
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
                {showManufacturingOptions ? (
                    <>
                        <div className="size-lg-12">
                            <div className="size-lg-6 size-md-12">
                                <Field
                                    labelClasses="no-capitalise"
                                    name="Set manufacturer(s) for building?"
                                >
                                    <CheckboxContainer
                                        checked={building.setManufacturersForHierarchy}
                                        name={`${building.id}.*.setManufacturersForHierarchy`}
                                        text=""
                                        handleChange={(name, value) => {
                                            updateBuilding(name, value, building.id);
                                            if (value) {
                                                handleShowOandMModal('add building');
                                            }
                                        }}
                                        disabled={building.isManufacturingInherited}
                                    />
                                </Field>
                            </div>
                        </div>
                        {building.setManufacturersForHierarchy && (
                            <div className="size-lg-12">
                                <Field
                                    labelClasses="no-capitalise"
                                    name="Manufacturer(s)"
                                    required={building.setManufacturersForHierarchy}
                                >
                                    <CheckboxListContainer
                                        name={`${building.id}.*.selectedManufacturerOptions`}
                                        text=""
                                        handleChange={(name, value) =>
                                            updateBuilding(name, value, building.id)
                                        }
                                        selectedOptions={building.selectedManufacturerOptions}
                                        options={building.manufacturerOptions}
                                        allOptionsDisabled={building.isManufacturingInherited}
                                        required={building.setManufacturersForHierarchy}
                                    />
                                </Field>
                            </div>
                        )}
                        {building.setManufacturersForHierarchy &&
                            Object.entries(building.optionValuesOptions).map(
                                ([manufacturerID, optionValues]) => {
                                    if (
                                        building.selectedManufacturerOptions.includes(
                                            manufacturerID,
                                        )
                                    ) {
                                        const manufacturerInfo = building.manufacturerOptions.find(
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
                                                    required
                                                >
                                                    <CheckboxListContainer
                                                        name={`${building.id}.*.selectedOptionValues`}
                                                        text=""
                                                        handleChange={(name, value) =>
                                                            updateBuilding(name, value, building.id)
                                                        }
                                                        selectedOptions={
                                                            building.selectedOptionValues
                                                        }
                                                        options={Object.values(optionValues)}
                                                        allOptionsDisabled={
                                                            building.isManufacturingInherited
                                                        }
                                                        required
                                                    />
                                                </Field>
                                            </div>
                                        );
                                    } else return null;
                                },
                            )}
                    </>
                ) : (
                    <>
                        <FieldOutput fieldClass="center-align">
                            <div className="form-field size-lg-12">
                                <p>
                                    Manufacturers already set at {siteName}.
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
                    </>
                )}

                {showDropdownOptions ? (
                    <>
                        <div className="size-lg-12">
                            <div className="size-lg-6 size-md-12">
                                <Field
                                    labelClasses="no-capitalise"
                                    name="Set item types for building?"
                                >
                                    <CheckboxContainer
                                        checked={building.setDropdownOptionsForHierarchy}
                                        name={`${building.id}.*.setDropdownOptionsForHierarchy`}
                                        text=""
                                        handleChange={(name, value) =>
                                            updateBuilding(name, value, building.id)
                                        }
                                        disabled={building.isDropdownOptionsInherited}
                                    />
                                </Field>
                            </div>
                        </div>
                        {building.setDropdownOptionsForHierarchy && (
                            <div className="size-lg-12">
                                <Field
                                    labelClasses="no-capitalise"
                                    name="Manufacturer(s)"
                                    required={building.setDropdownOptionsForHierarchy}
                                >
                                    <CheckboxListContainer
                                        name={`${building.id}.*.selectedDropdownOptions`}
                                        text=""
                                        handleChange={(name, value) =>
                                            updateBuilding(name, value, building.id)
                                        }
                                        selectedOptions={building.selectedDropdownOptions}
                                        options={building.dropdownOptions}
                                        allOptionsDisabled={building.isDropdownOptionsInherited}
                                        required={building.setDropdownOptionsForHierarchy}
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
                                    Item types already set at {siteName}.
                                    <br /> This cannot be overridden at this level, click{' '}
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

                {buildings.length > 1 && (
                    <BlockButtonWrapper>
                        <button
                            className="button red icon-only"
                            type="button"
                            onClick={() => removeBuilding(building.id)}
                        >
                            <i className="fa fa-trash" />
                        </button>
                    </BlockButtonWrapper>
                )}
            </div>
        );
    });

export default BuildingFormFieldsWithLabel;
