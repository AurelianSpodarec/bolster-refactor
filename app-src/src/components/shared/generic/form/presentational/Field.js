import React from 'react';

const Field = ({ children, name, sizeClasses = 'size-lg-12', htmlFor }) => (
    <div className={`form-field ${sizeClasses}`}>
        {name && name.length && (
            <label className="title" htmlFor={htmlFor}>
                {name}
            </label>
        )}

        {children}
    </div>
);

export default Field;
