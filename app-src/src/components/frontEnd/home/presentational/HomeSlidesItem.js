/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import HomeCarouselControls from './HomeCarouselControls';
import FrontEndFooterContainer from 'components/frontEnd/layout/footer/containers/FrontEndFooterContainer';
import TrustedBy from 'components/frontEnd/trustedBy/presentational/TrustedBy';
import BackToTopContainer from 'components/frontEnd/shared/backToTop/containers/BackToTopContainer';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const HomeSlidesItem = forwardRef(
    ({ background, className, isLast, active, handleClick, item, isMobile }, ref) => {
        if (!isLast) {
            return (
                <section className={`slide ${className}`}>
                    <div className="slide-container">
                        <video className="video-bg" autoPlay muted loop>
                            <source src={background} type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
                        <div className="slide-content">
                            <h1 className="slide-title">{item.title}</h1>
                            <p className="slide-description">{item.description}</p>
                            <FrontEndButton to={item.link}>{item.buttonText}</FrontEndButton>
                        </div>
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
                    <div className="slide-content">
                        <h1 className="slide-title">{item.title}</h1>
                        <p className="slide-description">{item.description}</p>
                        <FrontEndButton to={item.link}>{item.buttonText}</FrontEndButton>
                    </div>
                </div>
                <HomeCarouselControls
                    isMobile={isMobile}
                    active={active}
                    last
                    handleClick={handleClick}
                />
                <TrustedBy />
                <BackToTopContainer handleClick={handleClick ? () => handleClick(0) : null} />
                <FrontEndFooterContainer />
            </section>
        );
    },
);

export default HomeSlidesItem;
