import React from 'react';

const RadioButton = ({ name, value, text, checked, handleInputChange }) => (
    <>
        <input
            type="radio"
            id={value}
            name={name}
            value={value}
            checked={checked}
            onChange={handleInputChange}
        />
        <label htmlFor={value}>{text}</label>
    </>
);

export default RadioButton;
