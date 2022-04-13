import React from 'react';

const ActionButton = ({
    onClick = () => {},
    type = 'button',
    text = '',
    icon = '',
    svgIconComponent: SvgIconComponent, // SVG icon, needs to be imported as component
    iconRight = false,
    iconSpin = false,
    iconOnly = false,
    iconWeight = 'solid',
    iconEqualSize = false,
    disabled = false,
    source = 'primary', // primary, secondary
    ambient = 'primary', // primary, positive, negative
    size = 'small', // medium, small
    extraClasses = '',
}) => {
    const iconWeightLookup = {
        solid: 'fa',
        regular: 'far',
        light: 'fal',
    };
    const dynamicButtonClass = `custom-button flex-row align-center justify-${
        iconRight ? 'end' : 'start'
    } ${iconOnly ? 'icon-only' : ''}`;

    const dynamicIconClass = `icon ${iconWeightLookup[iconWeight] || 'fa'} fa-${icon} ${
        iconSpin ? 'fa-spin' : ''
    } ${iconEqualSize ? 'fa-fw' : ''}`;

    return (
        <button
            className={`custom-button flex-row align-center ${extraClasses} ${dynamicButtonClass}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            data-source={source}
            data-ambient={ambient}
            data-size={size}
        >
            {icon && !iconRight && <i className={dynamicIconClass}></i>}
            {!icon && SvgIconComponent && !iconRight && <SvgIconComponent className="svg-icon" />}
            {text && !iconOnly && <span className="text">{text}</span>}
            {icon && iconRight && <i className={dynamicIconClass}></i>}
            {!icon && SvgIconComponent && iconRight && <SvgIconComponent className="svg-icon" />}
        </button>
    );
};

export default ActionButton;
