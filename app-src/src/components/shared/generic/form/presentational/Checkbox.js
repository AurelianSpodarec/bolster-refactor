import React from 'react';

const Checkbox = ({ item, checked, handleChange, name, error }) => (
    <div className="size-lg-4">
        <input
            onChange={handleChange}
            type="checkbox"
            id={item.name}
            checked={checked}
            name={name}
        />
        <label htmlFor={name}>{name}</label>
        {error && error.length && (
            <p className="error red-text text-accent-4">{error}</p>
        )}
    </div>
);

export default Checkbox;
