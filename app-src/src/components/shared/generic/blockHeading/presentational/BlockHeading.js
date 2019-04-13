import React from 'react';

const BlockHeading = ({ title, classes = '', leftIcon = false, children }) => (
    <div className={`block-heading ${classes} size-lg-12`}>
        {leftIcon && children}
        <h3 className="heading heading-3">{title}</h3>
        {!leftIcon && children}
    </div>
);

export default BlockHeading;
