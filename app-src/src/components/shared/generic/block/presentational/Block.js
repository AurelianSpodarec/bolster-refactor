import React from 'react';

const Block = ({ children, containerClass }) => (
    <div
        className={`content-container ${
            containerClass ? containerClass : 'size-lg-12'
        }`}
    >
        <div className="content-area">{children}</div>
    </div>
);

export default Block;
