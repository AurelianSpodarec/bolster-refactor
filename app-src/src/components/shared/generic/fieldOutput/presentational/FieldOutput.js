import React from 'react';

const FieldOutput = ({
    title = '',
    description = '',
    sizeClass = 'size-lg-12',
    fieldClass = '',
    children
}) => (
    <div className={`field-output ${fieldClass} ${sizeClass}`}>
        {title ? <label className="title">{title}</label> : ''}
        {description ? <p>{description}</p> : ''}
        {children}
    </div>
);

export default FieldOutput;
