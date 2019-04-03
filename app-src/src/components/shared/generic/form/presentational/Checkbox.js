import React from 'react';

const Checkbox = ({
    value,
    checked,
    handleChange,
    name,
    text,
    error,
    disabled = false
}) => (
    <div className="size-lg-4">
        <input
            id={`${name}_${value}`}
            onChange={handleChange}
            type="checkbox"
            value={value}
            checked={checked}
            name={name}
            disabled={disabled}
        />
        <label
            htmlFor={`${name}_${value}`}
            // ? ## needs styling for disabled ##
            // style={disabled ? { color: 'grey' } : {}}
        >
            {text}
        </label>
        {error && error.length && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </div>
);

export default Checkbox;
