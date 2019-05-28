import React from 'react';
import { Link } from 'react-router-dom';

const FrontEndButton = ({ to, children, classes = '' }) => (
    <Link to={to} className={`frontend-button ${classes}`}>
        {children}
    </Link>
);

export default FrontEndButton;
