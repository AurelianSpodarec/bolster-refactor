import React from 'react';

const LabelFieldItem = ({ source, title, content }) => (
    <div className="label-field-item  size-lg-12">
        <p className="size-lg-4">{source || 'Not Set'}</p>
        <p className="size-lg-4">{title || 'Not Set'}</p>
        <p className="size-lg-4">{content || 'Not Set'}</p>
    </div>
);

export default LabelFieldItem;
