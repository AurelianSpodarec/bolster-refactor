import React from 'react';

const CurrencyInput = ({
    type,
    name,
    placeholder,
    classes,
    value,
    handleChange,
    handleBlur
}) => (
    <>
        <input
            className={`generic-input ${classes}`}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            min="0.00"
            step="0.01"
            onChange={handleChange}
            onBlur={handleBlur}
        />
    </>
);

export default CurrencyInput;
