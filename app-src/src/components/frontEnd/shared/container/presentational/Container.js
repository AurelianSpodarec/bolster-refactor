import React from 'react';

const Container = ({ children, className = '' }) => (
    <div className={`frontend-container ${className}`}>{children}</div>
);

export default Container;
