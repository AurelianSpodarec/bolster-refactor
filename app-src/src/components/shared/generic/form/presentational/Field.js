import React from 'react';

const Field = ({
    children,
    name = '',
    smallDesc = null,
    sizeClasses = 'size-lg-12',
    classes = '',
    required = false,
    htmlFor,
    styles = {},
}) => (
    <div className={`form-field ${sizeClasses} ${classes} `} style={{ ...styles }}>
        {name && name.length && (
            <label className="title" htmlFor={htmlFor}>
                {name} <span className="small">{smallDesc ? smallDesc : ''}</span>{' '}
                {required && <sub>*</sub>}
            </label>
        )}

        {children}
    </div>
);

export default Field;
