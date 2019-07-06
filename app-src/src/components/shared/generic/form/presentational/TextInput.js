import React from 'react';

const TextInput = ({
    type,
    name,
    placeholder,
    classes,
    value,
    handleChange,
    handleBlur,
    error,
    charLimit,
    maxNum,
    disabled
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
            maxLength={charLimit}
            max={maxNum}
            disabled={disabled}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default TextInput;
