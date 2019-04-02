import React from 'react';

const Checkbox = ({ id, checked, handleChange, name, error, disabled }) => (
    <div className="size-lg-4">
        <input
            onChange={handleChange}
            type="checkbox"
            id={`service_${id}`}
            checked={checked}
            name={name}
            disabled={disabled}
        />
        <label
            htmlFor={`service_${id}`}
            // ? ## needs styling for disabled ##
            // style={disabled ? { color: 'grey' } : {}}
        >
            {name}
        </label>
        {error && error.length && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </div>
);

export default Checkbox;
