import React from 'react';

import { useFullPageCarousel } from 'helpers/frontEndHooks';
import { HomeSlidesList } from 'constants/frontEnd/homeSlides';

import HomeSlidesItem from '../presentational/HomeSlidesItem';
import HomeCarouselControls from '../presentational/HomeCarouselControls';
import FrontEndFooterContainer from 'components/frontEnd/layout/footer/containers/FrontEndFooterContainer';
import TrustedBy from 'components/frontEnd/trustedBy/presentational/TrustedBy';
import BackToTopContainer from 'components/frontEnd/shared/backToTop/containers/BackToTopContainer';
import HomeSlidesMobileItem from '../presentational/HomeSlidesMobileItem';

const HomeSlidesCarouselContainer = ({ isMobile }) => {
    const {
        currentIndex,
        max,
        handleClick,
        ref: wrapperRef,
        lastRef: lastSlideRef,
    } = useFullPageCarousel(isMobile);

    if (isMobile)
        return (
            <div className="frontend-home-mobile-carousel">
                {HomeSlidesList.map((item, index) => {
                    return (
                        <HomeSlidesMobileItem
                            key={index}
                            background={item.background}
                            fullVideo={item.fullVideo}
                            loop={item.backgroundLoop}
                            className={`slide${index + 1}`}
                            item={item}
                        />
                    );
                })}
                <HomeCarouselControls isMobile={isMobile} last handleClick={handleClick} />
                <TrustedBy />
                <BackToTopContainer />
                <FrontEndFooterContainer />
            </div>
        );

    return (
        <>
            <div ref={wrapperRef} className="frontend-home-carousel">
                {HomeSlidesList.map((item, index) => {
                    const isLast = index === max;
                    return (
                        <HomeSlidesItem
                            key={index}
                            background={item.background}
                            fullVideo={item.fullVideo}
                            loop={item.backgroundLoop}
                            className={`slide${index + 1}`}
                            isLast={isLast}
                            ref={lastSlideRef}
                            active={currentIndex}
                            handleClick={handleClick}
                            item={item}
                            index={index}
                        />
                    );
                })}
            </div>
            <HomeCarouselControls
                isMobile={isMobile}
                active={currentIndex}
                handleClick={handleClick}
            />
        </>
    );
};

export default HomeSlidesCarouselContainer;
