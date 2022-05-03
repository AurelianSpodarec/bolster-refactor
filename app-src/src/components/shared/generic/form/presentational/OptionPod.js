import React from 'react';

const OptionPod = ({
    name,
    checked,
    onChange,
    icon = '',
    svgIconComponent: SvgIconComponent,
    pathStroke = false,
    error,
    errorsVisible = true,
}) => {
    const iconClass = `icon fa fa-${icon}`;

    return (
        <div className={`option-pod ${checked ? 'selected' : ''}`}>
            <button name={name} onClick={() => onChange(name, !checked)}>
                {!icon && SvgIconComponent && (
                    <SvgIconComponent
                        className={`svg-icon ${pathStroke ? 'path-stroke' : 'path-fill'}`}
                    />
                )}
                {icon && !SvgIconComponent && <i className={iconClass}></i>}
            </button>
            {!!(error && error.length) && <p className="error red-text text-accent-4">{error}</p>}
        </div>
    );
};

export default OptionPod;
