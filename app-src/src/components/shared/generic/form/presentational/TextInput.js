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
    <div className="row">
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
    </div>
);

export default TextInput;
