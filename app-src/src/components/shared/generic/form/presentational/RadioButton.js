import React from 'react';

const RadioButton = ({ name, value, requiresAgreement, handleInputChange }) => (
    <>
        <input
            type="radio"
            id={value}
            name={name}
            value={value}
            checked={requiresAgreement === value}
            onClick={handleInputChange}
        />
        <label htmlFor={value}>{value}</label>
    </>
);

export default RadioButton;
