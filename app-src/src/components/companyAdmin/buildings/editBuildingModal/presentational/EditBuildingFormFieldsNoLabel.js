import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const BuildingFormFieldsNoLabel = ({
    handleInputChange,
    handleDateChange,
    name,
    location,
    isAlertShowing,
    alertMessage,
    alertDate
}) => (
    <>
        <div className="size-lg-12">
            <div className="size-lg-6">
                <Field name="Building name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-6">
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
            <div className="size-lg-6">
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
                <div className="size-lg-6">
                    <Field name="Alert Message">
                        <TextAreaContainer
                            value={alertMessage}
                            name="alertMessage"
                            handleChange={handleInputChange}
                        />
                    </Field>
                </div>

                <div className="size-lg-6">
                    <Field name="Date to send">
                        <DatePickerPresentational
                            name="alertDate"
                            selected={alertDate}
                            onChange={handleDateChange}
                            placeholderText="Date"
                            showTimeSelect
                        />
                    </Field>
                </div>
            </div>
        )}
    </>
);

export default BuildingFormFieldsNoLabel;
