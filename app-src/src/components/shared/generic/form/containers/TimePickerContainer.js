import React from 'react';

import TimePicker from 'react-time-picker';

const TimePickerContainer = ({
    name,
    disableClock = true,
    handleChange,
    extraClasses = '',
    sizeClasses = 'size-lg-12',
    value,
    required = true,
}) => (
    <TimePicker
        onChange={handleChange}
        name={name}
        value={value}
        maxDetail="minute"
        disableClock={disableClock}
        className={`${sizeClasses} timepicker ${extraClasses}`}
        required={required}
        hourAriaLabel="Hour"
        hourPlaceholder="HH"
        minutePlaceholder="MM"
        format="HH:mm a"
        maxTime="12:59"
    />
);
export default TimePickerContainer;
