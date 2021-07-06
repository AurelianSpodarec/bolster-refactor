import React from 'react';

const BlockEditor = ({ children, containerClass = 'size-lg-12', contentClass = '' }) => (
    <div className={`content-container ${containerClass}`}>
        <div className={`content-area-editor ${contentClass}`}>{children}</div>
    </div>
);

export default BlockEditor;
