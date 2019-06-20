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
    <div className="size-lg-12">
        <input
            className={`generic-input currency ${classes}`}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            min="0.00"
            step="0.01"
            onChange={handleChange}
            onBlur={handleBlur}
        />
    </div>
);

export default CurrencyInput;
