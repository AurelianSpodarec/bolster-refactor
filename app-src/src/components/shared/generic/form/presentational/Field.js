import React from 'react';

const Field = ({ children, name, sizeClasses = 'size-lg-12' }) => (
    <div className={`form-field ${sizeClasses}`}>
        {name && name.length && <label className="title">{name}</label>}

        {children}
    </div>
);

export default Field;
