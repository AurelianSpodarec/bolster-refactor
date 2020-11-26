import React from 'react';

const BannerNotification = ({ content, handleBannerClose }) => {
    return (
        <div className="banner-notification-wrapper">
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
