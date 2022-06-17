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
    format = 'hh:mm a',
    clearIcon,
}) => (
    <TimePicker
        onChange={handleChange}
        name={name}
        value={value}
        disableClock={disableClock}
        className={`${sizeClasses} timepicker ${extraClasses}`}
        required={required}
        hourAriaLabel="Hour"
        hourPlaceholder="HH"
        minutePlaceholder="MM"
        format={format}
        clearIcon={clearIcon}
    />
);

export default TimePickerContainer;
