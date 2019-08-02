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
    maxDate,
    showTimeSelect = false
}) => (
    <div className={`date-picker ${sizeClasses}`}>
        <DatePicker
            id={name}
            selected={selected}
            onChange={onChange}
            dateFormat={
                showTimeSelect
                    ? [
                          'dd/MM/yyyy HH:mm',
                          'd/M/yyyy HH:mm',
                          'dd/M/yyyy HH:mm',
                          'd/MM/yyyy HH:mm',
                          'd/M/yy HH:mm',
                          'dd/M/yy HH:mm',
                          'd/MM/yy HH:mm'
                      ]
                    : [
                          'dd/MM/yyyy',
                          'd/M/yyyy',
                          'dd/M/yyyy',
                          'd/MM/yyyy',
                          'd/M/yy',
                          'dd/M/yy',
                          'd/MM/yy'
                      ]
            }
            placeholderText={placeholderText}
            required={required}
            onBlur={onBlur}
            minDate={minDate}
            maxDate={maxDate}
            showTimeSelect={showTimeSelect}
        />
        <i className="far fa-calendar" />
    </div>
);

export default DatePickerPresentational;
