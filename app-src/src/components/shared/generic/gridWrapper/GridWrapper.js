import React from 'react';

const GridWrapper = ({ children, gap = 0, itemsPerRow = 3 }) => (
    <div
        className="grid-wrapper width-12"
        style={{ gap, gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }}
    >
        {children}
    </div>
);

export default GridWrapper;
