import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const BuildingFormFieldsWithLabel = ({
    handleInputChange,
    handleDateChange,
    name,
    location,
    isAlertShowing,
    message,
    dateToSend
}) => (
    <>
        <div className="size-lg-6 size-md-12">
            <div className="size-lg-12">
                <Field name="Building name" required>
                    <TextInputContainer
                        name="name"
                        value={name}
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
            <div className="size-lg-12">
                <Field name="Location">
                    <TextInputContainer
                        value={location}
                        name="location"
                        handleChange={handleInputChange}
                    />
                </Field>
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
        </div>
        <div className="size-lg-6 size-md-12">
            <BolsterLabelExample name={name} />
        </div>
    </>
);

export default BuildingFormFieldsWithLabel;
