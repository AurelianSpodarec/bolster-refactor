import React from 'react';

const LabelFieldExampleItem = ({ title, content }) => (
    <div className="label-content-field  size-lg-12">
        <p>{`${title || '{ empty }'}:`}</p>
        <p>{content || '{ empty }'}</p>
    </div>
);

export default LabelFieldExampleItem;
