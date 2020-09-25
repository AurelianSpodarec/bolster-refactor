/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import FrontEndFooter from 'components/frontEnd/layout/footer/presentational/FrontEndFooter';
import TrustedBy from 'components/frontEnd/trustedBy/presentational/TrustedBy';
import BackToTop from 'components/frontEnd/shared/backToTop/presentational/BackToTop';

const HomeSlidesItem = forwardRef(({ background, className, isLast, children }, ref) => {
    if (!isLast) {
        return (
            <section className={`slide ${className}`}>
                <div className="slide-container">
                    <video className="video-bg" autoPlay muted loop>
                        <source src={background} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                    <div className="overlay" />
                    {children}
                </div>
            </section>
        );
    }

    return (
        <section ref={ref} className={`slide ${className} last-slide`}>
            <div className="slide-container">
                <video className="video-bg" autoPlay muted loop>
                    <source src={background} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
                <div className="overlay" />
                {children}
            </div>
            <TrustedBy />
            <BackToTop />
            <FrontEndFooter />
        </section>
    );
});

export default HomeSlidesItem;
