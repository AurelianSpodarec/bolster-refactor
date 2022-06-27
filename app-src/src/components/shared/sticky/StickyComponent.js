import React from 'react';

const StickyComponent = ({ children, top = 0 }) => (
    <div className="sticky-component" style={{ top }}>
        {children}
    </div>
);

export default StickyComponent;
