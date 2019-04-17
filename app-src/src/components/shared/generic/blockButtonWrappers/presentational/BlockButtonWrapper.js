import React from 'react';

const BlockButtonWrapper = ({
    children,
    addtionalClasses = '',
    sizeClasses = 'size-lg-12'
}) => (
    <div
        className={`button-block-container ${addtionalClasses} ${sizeClasses}`}
    >
        {children}
    </div>
);

export default BlockButtonWrapper;
