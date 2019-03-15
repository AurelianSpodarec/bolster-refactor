import React from 'react';

const BlockHeadingWControls = ({ title, children }) => (
    <div className="block-heading size-lg-12">
        <h3 className="heading heading-3">{title}</h3>
        {children}
    </div>
);

export default BlockHeadingWControls;
