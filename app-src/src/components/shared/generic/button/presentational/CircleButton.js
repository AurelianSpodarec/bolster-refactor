import React from 'react';
import { Link } from 'react-router-dom';

const CircleButton = ({ icon, showNotification }) => (
    <Link to="/company/tools/transfer-requests" className="item">
        {showNotification && <span className="notification-dot" />}
        <img alt="exchange icon" className="tools-icon" src={icon} />
    </Link>
);

export default CircleButton;
