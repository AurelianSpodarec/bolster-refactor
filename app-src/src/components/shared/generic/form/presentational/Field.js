import React from 'react';

const Field = ({ children, name, sizeClasses = 'size-lg-12' }) => (
    <div className={`field ${sizeClasses}`}>
        {name && name.length && <label>{name}</label>}

        {children}
    </div>
);

export default Field;
