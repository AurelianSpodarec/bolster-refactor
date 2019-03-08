import React from 'react';

const Block = ({ children, containerClass = '', contentClass = '' }) => (
    <div
        className={`content-container ${
            containerClass.length ? containerClass : 'size-lg-12'
        }`}
    >
        <div
            className={`content-area ${
                contentClass.length ? contentClass : ''
            }`}
        >
            {children}
        </div>
    </div>
);

export default Block;
