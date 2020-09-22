import React, { useRef } from 'react';

const HomeSlidesItem = ({ background, className, children }) => {
    const itemRef = useRef(null);

    return (
        <section ref={itemRef} className={`slide ${className}`}>
            <video className="video-bg" autoPlay muted loop>
                <source src={background} type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            <div className="overlay" />
            {children}
        </section>
    );
};

export default HomeSlidesItem;
