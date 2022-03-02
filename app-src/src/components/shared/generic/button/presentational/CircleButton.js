import React from 'react';
import { Link } from 'react-router-dom';

const CircleButton = ({ href = '', icon, showNotification }) => (
    <Link to={href} className="circle-button flex-row justify-center align-center">
        {showNotification && <span className="notification-dot" />}
        <img alt="icon" className="icon" src={icon} />
        <div className="dark-hover"></div>
    </Link>
);

export default CircleButton;
