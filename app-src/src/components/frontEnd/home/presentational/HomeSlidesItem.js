/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import HomeCarouselControls from './HomeCarouselControls';
import FrontEndFooterContainer from 'components/frontEnd/layout/footer/containers/FrontEndFooterContainer';
import TrustedBy from 'components/frontEnd/trustedBy/presentational/TrustedBy';
import BackToTop from 'components/frontEnd/shared/backToTop/presentational/BackToTop';

const HomeSlidesItem = forwardRef(
    ({ background, className, isLast, children, active, handleClick }, ref) => {
        if (!isLast) {
            return (
                <section className={`slide ${className}`}>
                    <div className="slide-container">
                        <video className="video-bg" autoPlay muted loop>
                            <source src={background} type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
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
                    {children}
                </div>
                <HomeCarouselControls active={active} last handleClick={handleClick} />
                <TrustedBy />
                <BackToTop />
                <FrontEndFooterContainer />
            </section>
        );
    },
);

export default HomeSlidesItem;
