import React from 'react';
import { Link } from 'react-router-dom';

const CircleButton = ({ href = '', icon, showNotification }) => (
    <div className="circle-button-container">
        {showNotification && <span className="notification-dot" />}
        <Link to={href} className="circle-button flex-row justify-center align-center">
            <img alt="icon" className="icon" src={icon} />
            <div className="dark-hover"></div>
        </Link>
    </div>
);

export default CircleButton;
