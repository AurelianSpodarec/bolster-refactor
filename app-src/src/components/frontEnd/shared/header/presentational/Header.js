import React from 'react';

const Header = ({ children, className }) => (
    <div className={`frontend-section-title ${className}`}>{children}</div>
);

export default Header;
