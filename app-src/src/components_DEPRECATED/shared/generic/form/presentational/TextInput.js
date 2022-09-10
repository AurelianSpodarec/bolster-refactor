import React from 'react';

import PasswordStrengh from 'components_DEPRECATED/shared/passwordStrength/PasswordStrength';

const TextInput = ({
    type,
    name,
    placeholder,
    classes,
    value,
    handleChange,
    handleBlur,
    handleFocus,
    error,
    charLimit,
    minNum,
    maxNum,
    disabled,
    includePasswordStrength,
    disableMouseWheelControl,
    disableUpDownArrowControl,
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
            onFocus={handleFocus}
            maxLength={charLimit}
            min={minNum}
            max={maxNum}
            disabled={disabled}
            onWheel={e => {
                if (disableMouseWheelControl) e.target.blur();
            }}
            onKeyDown={e => {
                const disallowedKeys = ['ArrowUp', 'ArrowDown'];
                if (disableUpDownArrowControl && disallowedKeys.includes(e.key)) {
                    e.preventDefault();
                }
            }}
        />
        {!!(error && error.length) && <p className="error red-text text-accent-4">{error}</p>}
        {includePasswordStrength && <PasswordStrengh password={value} />}
    </>
);

export default TextInput;
