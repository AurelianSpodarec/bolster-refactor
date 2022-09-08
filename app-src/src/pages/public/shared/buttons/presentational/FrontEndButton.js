import React from 'react';
import { Link } from 'react-router-dom';

const FrontEndButton = ({
    to,
    children,
    classes = '',
    type = '',
    handleClick = () => {},
    disabled = false,
}) =>
    !!type && type.length ? (
        <button
            type={type}
            className={`frontend-button ${classes}`}
            onClick={e => handleClick(e)}
            disabled={disabled}
        >
            {children}
        </button>
    ) : (
        <Link to={to} className={`frontend-button ${classes}`}>
            {children}
        </Link>
    );

export default FrontEndButton;
