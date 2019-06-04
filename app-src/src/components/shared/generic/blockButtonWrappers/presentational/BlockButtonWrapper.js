import React from 'react';

const BlockButtonWrapper = ({
    children,
    additionalClasses = '',
    sizeClasses = 'size-lg-12'
}) => (
    <div
        className={`button-block-container ${additionalClasses} ${sizeClasses}`}
    >
        {children}
    </div>
);

export default BlockButtonWrapper;
