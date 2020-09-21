import React from 'react';

import PinsVideo from '_content/videos/frontend/05_Pins.mp4';

const FrontEndBanner = ({ background = '', heading = '', description = '' }) => (
    <div className="frontend-banner" style={{ backgroundImage: background }}>
        <video className="video" autoPlay="autoplay" loop muted>
            <source src={PinsVideo} type="video/mp4" />
        </video>
        <div className="content">
            <h1>{heading}</h1>
            <p>{description}</p>
        </div>
    </div>
);

export default FrontEndBanner;
