import React from 'react';

const Button = ({ children, className = '', handleClick = () => {} }) => (
    <button onClick={handleClick} className={`frontend-button ${className}`}>
        {children}
    </button>
);

export default Button;
