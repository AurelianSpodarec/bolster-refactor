import React from 'react';

const BlockHeading = ({ title, classes = '', children }) => (
    <div className={`block-heading ${classes} size-lg-12`}>
        <h3 className="heading heading-3">{title}</h3>
        {children}
    </div>
);

export default BlockHeading;
