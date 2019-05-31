import React from 'react';
import { Link } from 'react-router-dom';

const FrontEndButton = ({
    to,
    children,
    classes = '',
    type = '',
    handleSubmit = () => {}
}) =>
    !!type && type.length ? (
        <button
            type={type}
            className={`frontend-button ${classes}`}
            onClick={e => handleSubmit(e)}
        >
            {children}
        </button>
    ) : (
        <Link to={to} className={`frontend-button ${classes}`}>
            {children}
        </Link>
    );

export default FrontEndButton;
