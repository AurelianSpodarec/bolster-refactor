import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerPresentational = ({
    selected,
    onChange,
    name,
    placeholderText = `Please select ${name}`,
    required = true,
    onBlur = () => {},
    sizeClasses = 'size-lg-12',
    minDate,
    maxDate
}) => (
    <div className={`date-picker ${sizeClasses}`}>
        <DatePicker
            id={name}
            selected={selected}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            placeholderText={placeholderText}
            required={required}
            onBlur={onBlur}
            minDate={minDate}
            maxDate={maxDate}
        />
        <i className="far fa-calendar" />
    </div>
);

export default DatePickerPresentational;
