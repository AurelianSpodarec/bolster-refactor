import React from 'react';

const FrontEndBanner = ({ video = '', heading = '', description = '' }) => (
    <div className="frontend-banner">
        <video className="video" autoPlay="autoplay" loop muted>
            <source src={video} type="video/mp4" />
        </video>
        <div className="content">
            <h1>{heading}</h1>
            <p>{description}</p>
        </div>
    </div>
);

export default FrontEndBanner;
