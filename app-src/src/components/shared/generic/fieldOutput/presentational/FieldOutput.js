import React from 'react';

const FieldOutput = ({
    title = '',
    description = '',
    sizeClass = 'size-lg-12',
    fieldClass = '',
    children
}) => (
    <div className={`field-output ${fieldClass} ${sizeClass}`}>
        {title && title.length > 0 ? (
            <label className="title">{title}</label>
        ) : (
            ''
        )}
        {description && description.length > 0 ? <p>{description}</p> : ''}
        {children}
    </div>
);

export default FieldOutput;
