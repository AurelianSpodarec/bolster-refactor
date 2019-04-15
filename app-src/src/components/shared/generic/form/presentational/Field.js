import React from 'react';

const Field = ({
    children,
    name = '',
    sizeClasses = 'size-lg-12',
    classes = '',
    htmlFor
}) => (
    <div className={`form-field ${sizeClasses} ${classes}`}>
        {name && name.length && (
            <label className="title" htmlFor={htmlFor}>
                {name}
            </label>
        )}

        {children}
    </div>
);

export default Field;
