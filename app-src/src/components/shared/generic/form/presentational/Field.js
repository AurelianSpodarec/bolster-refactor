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
    labelClasses,
}) => {
    const titleCaseName = toTitleCase(name);
    return (
        <div className={`form-field ${sizeClasses} ${classes} `} style={{ ...styles }}>
            {name && name.length && (
                <label className={`title ${labelClasses}`} htmlFor={htmlFor}>
                    {label ?? titleCaseName}{' '}
                    <span className="small">{smallDesc ? smallDesc : ''}</span>{' '}
                    {required && <sub>*</sub>}
                </label>
            )}

            {children}
        </div>
    );
};

export default Field;
