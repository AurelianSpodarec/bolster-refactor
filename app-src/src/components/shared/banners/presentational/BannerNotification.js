import React from 'react';

const BannerNotification = ({ content, handleBannerClose, colour }) => {
    return (
        <div
            className="banner-notification-wrapper"
            style={colour ? { backgroundColor: colour } : '#d71a1a'}
        >
            <div className="banner-text">
                <i className="fas fa-bullhorn fa-fw" />{' '}
                <div
                    className="banner-wysiwyg-text"
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
            </div>
            <button className="button banner-dismiss" onClick={() => handleBannerClose()}>
                Dismiss
            </button>
        </div>
    );
};

export default BannerNotification;
