import React from 'react';

const ActionButton = ({
    onClick = () => {},
    type = 'button',
    text = '',
    icon = '',
    iconRight = false,
    disabled = false,
    source = 'primary', // primary, secondary, list
    ambient = 'primary', // primary, positive, negative
    size = 'medium', // medium, small
}) => {
    const dynamicClass = `justify-${
        iconRight ? 'end' : 'start'
    } source-${source} ambient-${ambient} size-${size}`;

    return (
        <button
            className={`custom-button flex-row align-center ${dynamicClass}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <i className={`icon fa fa-${icon}`}></i>}
            {text && <span className="text">{text}</span>}
        </button>
    );
};

export default ActionButton;
