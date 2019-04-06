import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNotifications = ({
    popupVisible,
    togglePopup,
    updateNode,
    notifications,
    unreadCount
}) => (
    <div className="item-container" ref={updateNode}>
        <div
            className={`item main ${popupVisible ? 'active' : ''}`}
            onClick={togglePopup}
        >
            {!!unreadCount && <span className="number">{unreadCount}</span>}
            <i className="far fa-bell fa-fw" />
        </div>

        <div className={`notification-list ${popupVisible ? 'visible' : ''}`}>
            {notifications.map(({ isRead, id, message, link }) => (
                <div className={`item ${isRead ? '' : 'unread'}`} key={id}>
                    <p>{message}</p>

                    {link.toLowerCase().includes('http') ? (
                        <a className="button" href={link}>
                            View
                        </a>
                    ) : (
                        <Link
                            onClick={togglePopup}
                            to={link}
                            className="button"
                        >
                            View
                        </Link>
                    )}
                </div>
            ))}
            <div className="item">
                <Link
                    onClick={togglePopup}
                    to="company/tools/generation-queue"
                    className="button"
                >
                    View qeneration queue
                </Link>
            </div>
        </div>
    </div>
);

export default HeaderNotifications;
