import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNotifications = ({
    popupVisible,
    togglePopup,
    updateNode,
    notifications,
    notificationsLength
}) => (
    <div className="item-container" ref={updateNode}>
        <div
            className={`item main ${popupVisible ? 'active' : ''}`}
            onClick={togglePopup}
        >
            <span className="number">{notificationsLength}</span>
            <i className="far fa-bell fa-fw" />
        </div>

        <div className={`notification-list ${popupVisible ? 'visible' : ''}`}>
            {notifications.map(notification => (
                <div className="item" key={notification.id}>
                    <p>{notification.description}</p>

                    <Link onClick={togglePopup} to="#" className="button">
                        View
                    </Link>
                </div>
            ))}
            <div className="item">
                <Link
                    onClick={togglePopup}
                    to="/tools/generation-queue"
                    className="button"
                >
                    View qeneration queue
                </Link>
            </div>
        </div>
    </div>
);

export default HeaderNotifications;
