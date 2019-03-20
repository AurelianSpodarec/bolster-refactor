import React from 'react';

const BlockButtonWrapper = ({ children, wrapperClass = '' }) => (
    <div className={`button-block-container ${wrapperClass} size-lg-12`}>
        {children}
    </div>
);

export default BlockButtonWrapper;
