import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerPresentational = ({
    selected,
    onChange,
    name,
    placeholderText = `Please select ${name}`,
    required = true,
    onBlur = () => {}
}) => (
    <div className="size-lg-12">
        <DatePicker
            id={name}
            selected={selected}
            onChange={onChange}
            dateFormat="dd/MM/YYYY"
            placeholderText={placeholderText}
            required={required}
            onBlur={onBlur}
        />
        <i className="far fa-calendar" />
    </div>
);

export default DatePickerPresentational;
