import React from 'react';

const RadioButton = ({
    name,
    value,
    text,
    checked,
    handleInputChange,
    disabled = false,
    extraDetails = ''
}) => (
    <div className={`radio-button ${disabled ? 'grey-out' : ''}`}>
        <input
            type="radio"
            id={value}
            name={name}
            value={value}
            checked={checked}
            onChange={() => handleInputChange(name, value)}
            disabled={disabled}
        />
        <div className={'holder'}>
            <label className="text" htmlFor={value}>
                {text}
            </label>
            <span className="outer">
                <span className="inner" />
            </span>
        </div>
        {!!extraDetails.length && (
            <span className="details">
                <strong>Note: </strong>
                {extraDetails}
            </span>
        )}
    </div>
);

export default RadioButton;
