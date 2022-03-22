import React from 'react';

const ActionButton = ({
    onClick = () => {},
    type = 'button',
    text = '',
    icon = '',
    iconRight = false,
    iconSpin = false,
    iconOnly = false,
    disabled = false,
    source = 'primary', // primary, secondary, list
    ambient = 'primary', // primary, positive, negative
    size = 'medium', // medium, small
}) => {
    const dynamicButtonClass = `custom-button flex-row align-center justify-${
        iconRight ? 'end' : 'start'
    } source-${source} ambient-${ambient} size-${size} ${iconOnly ? 'icon-only' : ''}`;

    const dynamicIconClass = `icon fa fa-${icon} ${iconSpin ? 'fa-spin' : ''}`;

    return (
        <button
            className={`custom-button flex-row align-center ${dynamicButtonClass}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && !iconRight && <i className={dynamicIconClass}></i>}
            {text && !iconOnly && <span className="text">{text}</span>}
            {icon && iconRight && <i className={dynamicIconClass}></i>}
        </button>
    );
};

export default ActionButton;
