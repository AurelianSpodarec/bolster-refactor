import React from 'react';

const Block = ({ children, containerClass = 'size-lg-12', contentClass = '', style = {} }) => (
    <div className={`content-container ${containerClass}`} style={style}>
        <div className={`content-area ${contentClass}`}>{children}</div>
    </div>
);

export default Block;
