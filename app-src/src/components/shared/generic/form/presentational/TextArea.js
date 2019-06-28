import React from 'react';

const TextArea = ({
    name,
    placeholder,
    value,
    handleChange,
    handleBlur,
    error,
    charLimit,
    classes,
    disabled
}) => (
    <>
        <textarea
            className={`generic-input ${classes}`}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={charLimit}
            disabled={disabled}
        />
        {!!(error && error.length) && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </>
);

export default TextArea;
