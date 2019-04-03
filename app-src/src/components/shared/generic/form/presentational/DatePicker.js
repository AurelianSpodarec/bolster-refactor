import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerPresentational = ({ selected, onChange, name, label }) => {
    return (
        <div className="size-lg-4">
            <label htmlFor={name}>{label}</label>
            <DatePicker
                id={name}
                selected={selected}
                onChange={onChange}
                dateFormat="dd/MM/YYYY"
                placeholderText={`Please select ${name}`}
            />
        </div>
    );
};

export default DatePickerPresentational;
