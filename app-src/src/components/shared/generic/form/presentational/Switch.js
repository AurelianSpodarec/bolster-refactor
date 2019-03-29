import React from 'react';

const Switch = ({ checked, name, text, handleChange }) => (
    <div className="size-lg-6">
        <input
            type="checkbox"
            name={name}
            id={name}
            checked={checked}
            onChange={handleChange}
        />
        <label htmlFor={name}>{text}</label>
    </div>
);

export default Switch;
