import React from 'react';

const FieldOutput = ({
    title,
    description,
    sizeClass = 'size-lg-12',
    fieldClass = ''
}) => (
    <div className={`field-output ${fieldClass} ${sizeClass}`}>
        <label className="title">{title}</label>
        <p>{description}</p>
    </div>
);

export default FieldOutput;
