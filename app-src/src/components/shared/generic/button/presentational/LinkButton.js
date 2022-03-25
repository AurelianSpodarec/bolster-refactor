import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({
    href = '',
    text = '',
    icon = '',
    iconRight = false,
    iconSpin = false,
    iconOnly = false,
    disabled = false,
    source = 'primary', // primary, secondary
    ambient = 'primary', // primary, positive, negative
    size = 'medium', // medium, small
}) => {
    const dynamicButtonClass = `custom-button flex-row align-center justify-${
        iconRight ? 'end' : 'start'
    } source-${source} ambient-${ambient} size-${size} ${iconOnly ? 'icon-only' : ''}`;

    const dynamicIconClass = `icon fa fa-${icon} ${iconSpin ? 'fa-spin' : ''}`;

    return (
        <Link
            to={href}
            className={`custom-button flex-row align-center ${dynamicButtonClass}`}
            disabled={disabled}
        >
            {icon && !iconRight && <i className={dynamicIconClass}></i>}
            {text && !iconOnly && <span className="text">{text}</span>}
            {icon && iconRight && <i className={dynamicIconClass}></i>}
        </Link>
    );
};

export default LinkButton;
