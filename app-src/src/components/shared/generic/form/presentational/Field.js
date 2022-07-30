import React from 'react';
import { toTitleCase } from 'helpers/generic';

const Field = ({
    children,
    name = '',
    label,
    smallDesc = null,
    sizeClasses = 'size-lg-12',
    classes = '',
    required = false,
    htmlFor,
    styles = {},
    labelClasses = '',
    forceName = false,
    valueLength,
    charLimit,
}) => {
    const titleCaseName = toTitleCase(name);
    const titleOutput = label ? label : titleCaseName ? titleCaseName : '\u00A0';
    const labelOutput = `${titleOutput}${
        charLimit && valueLength !== undefined ? ` (${valueLength}/${charLimit})` : ''
    }`;

    return (
        <div className={`form-field ${sizeClasses} ${classes} `} style={{ ...styles }}>
            <div className="flex-row-reverse">
                {(name || forceName) && (
                    <label className={` title  ${labelClasses}`} htmlFor={htmlFor}>
                        {labelOutput}
                        <span className="small">{smallDesc ? smallDesc : ''}</span>{' '}
                        {required && <sub>*</sub>}
                    </label>
                )}
            </div>

            {children}
        </div>
    );
};

export default Field;
