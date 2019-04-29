import React from 'react';
import { Link } from 'react-router-dom';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
            {notifications.length ? (
                notifications.map(({ isRead, id, message, link }) => (
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
                ))
            ) : (
                <span className="no-data centered size-lg-12">
                    You have no notifications
                </span>
            )}
            {}
            <div className="item">
                <ButtonContainer
                    handleClick={togglePopup}
                    to="/company/tools/company-reports"
                >
                    View Company Reports
                </ButtonContainer>
            </div>
        </div>
    </div>
);

export default HeaderNotifications;
