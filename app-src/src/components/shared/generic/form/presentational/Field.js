import React from 'react';
import { toTitleCase } from 'helpers/generic';

const Field = ({
    children,
    name = '',
    sizeClasses = 'size-lg-12',
    classes = '',
    required = false,
    htmlFor,
    styles = {},
}) => {
    const titleCaseName = toTitleCase(name);
    return (
        <div className={`form-field ${sizeClasses} ${classes} `} style={{ ...styles }}>
            {name && name.length && (
                <label className="title" htmlFor={htmlFor}>
                    {titleCaseName} {required && <sub>*</sub>}
                </label>
            )}

            {children}
        </div>
    );
};

export default Field;
