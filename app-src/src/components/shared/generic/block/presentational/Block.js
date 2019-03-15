import React from 'react';

const Block = ({
    children,
    containerClass = 'size-lg-12',
    contentClass = ''
}) => (
    <div className={`content-container ${containerClass}`}>
        <div className={`content-area ${contentClass}`}>{children}</div>
    </div>
);

export default Block;
