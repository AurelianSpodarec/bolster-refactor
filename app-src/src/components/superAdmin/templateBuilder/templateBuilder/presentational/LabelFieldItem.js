import React from 'react';

const LabelFieldItem = ({ source, title, content }) => (
    <div className="label-field-item  size-lg-12">
        <p className="size-lg-3">{source || '{ empty }'}</p>
        <p className="size-lg-3">{title || '{ empty }'}</p>
        <p className="size-lg-3">{content || '{ empty }'}</p>
    </div>
);

export default LabelFieldItem;
