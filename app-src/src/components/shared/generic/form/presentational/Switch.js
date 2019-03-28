import React from 'react';

const Switch = ({ checked, value, name, handleChange }) => (
    <div className="size-lg-6">
        <input
            type="checkbox"
            value={value}
            name={name}
            checked={checked}
            onChange={handleChange}
        />
        <label>hello</label>
    </div>
);

export default Switch;
