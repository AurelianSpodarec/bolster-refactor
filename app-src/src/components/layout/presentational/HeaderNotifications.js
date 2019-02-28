import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNotifications = ({
    popupVisible,
    handleClick,
    updateNode,
    notifications
}) => (
    <div className="item-container" ref={updateNode}>
        <div className="item main" onClick={handleClick}>
            <i className="far fa-bell fa-fw" />
        </div>

        <div className={`notification-list ${popupVisible ? 'visible' : ''}`}>
            {notifications.map(notification => (
                <div className="item" key={notification.id}>
                    <p>{notification.description}</p>

                    <Link to="#" className="button">
                        View
                    </Link>
                </div>
            ))}
            <div className="item">
                <Link to="#" className="button">
                    View all notifications
                </Link>
            </div>
        </div>
    </div>
);

export default HeaderNotifications;
