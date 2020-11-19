import React from 'react';

import ArrowIcon from '_content/images/frontend-new/banners/banner-arrow.png';

const FrontEndBanner = ({ video = '', heading = '', description = '' }) => (
    <div className="frontend-banner">
        <video className="video" autoPlay playsInline loop muted>
            <source src={video} type="video/mp4" />
        </video>

        <div className="content">
            <h1>{heading}</h1>
            <p>{description}</p>
        </div>

        <img className="arrow" alt="arrow" src={ArrowIcon} />
    </div>
);

export default FrontEndBanner;
