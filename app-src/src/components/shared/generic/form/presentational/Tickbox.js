import React from 'react';

const Tickbox = ({ checked = true, handleChange, name, value, classes = '', label }) => {
    return (
        <label className="tickbox">
            <input
                type="checkbox"
                checked={checked}
                name={name}
                onClick={({ target: { name, checked, value } }) =>
                    handleChange(name, checked, value)
                }
                value={value}
            />
            <span className="checkmark"></span>
            {label}
        </label>
    );
};

export default Tickbox;
