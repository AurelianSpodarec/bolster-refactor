import React from 'react';

const TextInput = ({
    type,
    name,
    placeholder,
    value,
    handleChange,
    handleBlur,
    error
}) => (
    <>
        <input
            className="generic-input"
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default TextInput;
