import React from 'react';
import { Link } from 'react-router-dom';

const FrontEndButton = ({ to, children, classes = '', type = '' }) =>
    !!type && type.length ? (
        <button type={type} className={`frontend-button ${classes}`}>
            {children}
        </button>
    ) : (
        <Link to={to} className={`frontend-button ${classes}`}>
            {children}
        </Link>
    );

export default FrontEndButton;
