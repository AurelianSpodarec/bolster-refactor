import React from 'react';

const GridWrapper = ({ children, gap = 0, itemsPerRow = 3, containerClass, columns = '' }) => (
    <div
        className={`grid-wrapper width-12 ${containerClass}`}
        style={{
            gap,
            gridTemplateColumns: columns ? columns : `repeat(${itemsPerRow}, 1fr)`,
        }}
    >
        {children}
    </div>
);

export default GridWrapper;
