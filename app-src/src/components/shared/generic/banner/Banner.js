import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Banner = ({ handleBannerClose }) => {
    const banners = useSelector(({ shared }) => shared.bannerReducer.banner);

    if (isEmpty(banners)) return null;

    return (
        <div
            className="banner-notification-wrapper alerts"
            style={{ backgroundColor: banners[Object.keys(banners)[0]].bgColor }}
        >
            <div className="banner-text">
                <div
                    className="banner-wysiwyg-text"
                    dangerouslySetInnerHTML={{ __html: banners[Object.keys(banners)[0]].content }}
                ></div>
            </div>
            {banners[Object.keys(banners)[0]].showDismiss && (
                <button className="button banner-dismiss" onClick={() => handleBannerClose()}>
                    Dismiss
                </button>
            )}
        </div>
    );
};

export default Banner;
