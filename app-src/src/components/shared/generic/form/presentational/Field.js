import React from 'react';

const Field = ({
    children,
    name = '',
    sizeClasses = 'size-lg-12',
    classes = '',
    reqiured = false,
    htmlFor
}) => (
    <div className={`form-field ${sizeClasses} ${classes} `}>
        {name && name.length && (
            <label className="title" htmlFor={htmlFor}>
                {name} {reqiured && <sub>*</sub>}
            </label>
        )}

        {children}
    </div>
);

export default Field;
