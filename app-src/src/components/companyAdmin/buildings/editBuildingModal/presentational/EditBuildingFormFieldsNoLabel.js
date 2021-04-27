import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const BuildingFormFieldsNoLabel = ({
    handleInputChange,
    handleDateChange,
    name,
    location,
    isAlertShowing,
    message,
    dateToSend,
    isManufacturingInherited,
    setManufacturersForHierarchy,
    manufacturerOptions,
    selectedManufacturerOptions,
    selectedOptionValues,
    optionValuesOptions,
    handleShowManufacturingOptions,
    showManufacturingOptions,
    manufacturingInheritedFrom,
    showDropdownOptions,
    setDropdownOptionsForHierarchy,
    isDropdownOptionsInherited,
    selectedDropdownOptions,
    dropdownOptions,
    isDropDownOptionsInheritedFrom,
    handleShowDropdownOptions,
}) => (
    <>
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Building name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6 size-md-12">
                <Field name="Location">
                    <TextInputContainer
                        value={location}
                        name="location"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Send an alert?">
                    <CheckboxContainer
                        checked={isAlertShowing}
                        name="isAlertShowing"
                        text=""
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        {isAlertShowing && (
            <div className="size-lg-12">
                <div className="size-lg-12">
                    <Field name="Alert Message">
                        <TextAreaContainer
                            value={message}
                            name="message"
                            handleChange={handleInputChange}
                        />
                    </Field>
                </div>

                <div className="size-lg-12">
                    <Field name="Date to send">
                        <DatePickerPresentational
                            name="dateToSend"
                            selected={dateToSend}
                            onChange={handleDateChange}
                            placeholderText="Date"
                            showTimeSelect
                        />
                    </Field>
                </div>
            </div>
        )}
        {showManufacturingOptions ? (
            <>
                <div className="size-lg-12">
                    <div className="size-lg-6 size-md-12">
                        <Field
                            labelClasses="no-capitalise"
                            name="Set manufacturer(s) for building?"
                        >
                            <CheckboxContainer
                                checked={setManufacturersForHierarchy}
                                name="setManufacturersForHierarchy"
                                text=""
                                handleChange={handleInputChange}
                                disabled={isManufacturingInherited}
                            />
                        </Field>
                    </div>
                </div>
                {setManufacturersForHierarchy && (
                    <div className="size-lg-12">
                        <Field labelClasses="no-capitalise" name="Manufacturer(s)" required>
                            <CheckboxListContainer
                                name="selectedManufacturerOptions"
                                text=""
                                handleChange={handleInputChange}
                                selectedOptions={selectedManufacturerOptions}
                                options={manufacturerOptions}
                                allOptionsDisabled={isManufacturingInherited}
                                required
                            />
                        </Field>
                    </div>
                )}

                {setManufacturersForHierarchy &&
                    Object.entries(optionValuesOptions).map(([manufacturerID, optionValues]) => {
                        if (selectedManufacturerOptions.includes(manufacturerID)) {
                            const manufacturerInfo = manufacturerOptions.find(
                                element => String(element.id) === String(manufacturerID),
                            );

                            return (
                                <div className="size-lg-12">
                                    <Field
                                        labelClasses="no-capitalise"
                                        name={`${manufacturerInfo.name} ${
                                            DROPDOWN_OPTIONS[manufacturerInfo.pinOptionType].name
                                        }
                                  `}
                                    >
                                        <CheckboxListContainer
                                            name="selectedOptionValues"
                                            text=""
                                            handleChange={handleInputChange}
                                            selectedOptions={selectedOptionValues}
                                            options={Object.values(optionValues)}
                                            allOptionsDisabled={isManufacturingInherited}
                                        />
                                    </Field>
                                </div>
                            );
                        } else return null;
                    })}
            </>
        ) : (
            <>
                <FieldOutput fieldClass="center-align">
                    <div className="form-field size-lg-12">
                        <p>
                            Manufacturers already set at {manufacturingInheritedFrom}.
                            <br /> This cannot be overridden at this level, click{' '}
                            <span onClick={() => handleShowManufacturingOptions()}>here</span> to
                            see the settings.
                        </p>
                    </div>
                </FieldOutput>
            </>
        )}

        {showDropdownOptions ? (
            <>
                <div className="size-lg-12">
                    <div className="size-lg-6 size-md-12">
                        <Field labelClasses="no-capitalise" name="Set item types for building?">
                            <CheckboxContainer
                                checked={setDropdownOptionsForHierarchy}
                                name="setDropdownOptionsForHierarchy"
                                text=""
                                handleChange={handleInputChange}
                                disabled={isDropdownOptionsInherited}
                            />
                        </Field>
                    </div>
                </div>
                {setDropdownOptionsForHierarchy && (
                    <div className="size-lg-12">
                        <Field labelClasses="no-capitalise" name="Item type(s)">
                            <CheckboxListContainer
                                name="selectedDropdownOptions"
                                text=""
                                handleChange={handleInputChange}
                                selectedOptions={selectedDropdownOptions}
                                options={dropdownOptions}
                                allOptionsDisabled={isDropdownOptionsInherited}
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
                            Item types already set at {isDropDownOptionsInheritedFrom}.
                            <br /> This cannot be overridden at this level, click{' '}
                            <span
                                onClick={() => {
                                    handleShowDropdownOptions();
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
    </>
);

export default BuildingFormFieldsNoLabel;
