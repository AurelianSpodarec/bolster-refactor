import React from 'react';

const Tickbox = ({ checked, handleChange, name, value, classes = '', label }) => {
    return (
        <label className={`tickbox ${classes}`}>
            <input
                type="checkbox"
                checked={checked}
                name={name}
                onClick={({ target: { name, checked, value } }) =>
                    handleChange(name, checked, value)
                }
                onChange={() => {}} // Stops error
                value={value}
            />
            <span className="checkmark"></span>
            {label}
        </label>
    );
};

export default Tickbox;
