import React from 'react';

const LabelFieldExampleItem = ({ title, content }) => (
    <div className="label-content-field  size-lg-12">
        <p>{`${title || ' '}`}</p>
        <p>{content || ' '}</p>
    </div>
);

export default LabelFieldExampleItem;
