import React from 'react';

const BlockButtonWrapper = ({ children, addtionalClasses = '' }) => (
    <div className={`button-block-container ${addtionalClasses} size-lg-12`}>
        {children}
    </div>
);

export default BlockButtonWrapper;
