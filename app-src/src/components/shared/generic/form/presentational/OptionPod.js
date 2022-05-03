import React from 'react';

const OptionPod = ({
    name,
    checked,
    onChange,
    icon = '',
    svgIconComponent: SvgIconComponent,
    pathStroke = false,
}) => {
    const iconClass = `icon fa fa-${icon}`;

    return (
        <button
            className={`option-pod ${checked ? 'selected' : ''}`}
            name={name}
            onClick={() => onChange(name, !checked)}
        >
            {!icon && SvgIconComponent && (
                <SvgIconComponent
                    className={`svg-icon ${pathStroke ? 'path-stroke' : 'path-fill'}`}
                />
            )}
            {icon && !SvgIconComponent && <i className={iconClass}></i>}
        </button>
    );
};

export default OptionPod;
