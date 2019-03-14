import React from 'react';

const Block = ({ children, containerClass, contentClass }) => (
    <div
        className={`content-container ${
            containerClass ? containerClass : 'size-lg-12'
        }`}
    >
        <div className={`content-area ${contentClass ? contentClass : ''}`}>
            {children}
        </div>
    </div>
);

export default Block;
