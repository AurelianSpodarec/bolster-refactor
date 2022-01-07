import React from 'react';

import PasswordStrengh from 'components/shared/passwordStrength/PasswordStrength';

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
    minNum,
    maxNum,
    disabled,
    includePasswordStrength,
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
            min={minNum}
            max={maxNum}
            disabled={disabled}
        />
        {!!(error && error.length) && <p className="error red-text text-accent-4">{error}</p>}
        {includePasswordStrength && <PasswordStrengh password={value} />}
    </>
);

export default TextInput;
