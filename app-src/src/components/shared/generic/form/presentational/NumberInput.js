import React from 'react';

const NumberInput = ({
    type,
    name,
    placeholder,
    classes,
    value,
    handleChange,
    handleBlur,
    error,
    maxNum
}) => (
    <>
        <input
            className={`generic-input ${classes}`}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            max={maxNum}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default NumberInput;
