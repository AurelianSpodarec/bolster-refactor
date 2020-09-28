import React, { useRef } from 'react';

import { useFullPageCarousel } from 'helpers/frontEndHooks';
import { HomeSlidesList } from 'constants/frontEnd/homeSlides';

import HomeSlidesItem from '../presentational/HomeSlidesItem';
import HomeCarouselControls from '../presentational/HomeCarouselControls';

const HomeSlidesCarouselContainer = ({ isMobile }) => {
    const wrapperRef = useRef();
    const lastSlideRef = useRef(null);
    const { currentIndex, max, handleClick } = useFullPageCarousel(
        wrapperRef,
        lastSlideRef,
        isMobile,
    );

    if (isMobile)
        return (
            <div className="frontend-home-mobile-carousel">
                {HomeSlidesList.map((item, index) => {
                    const isLast = index === max;
                    return (
                        <HomeSlidesItem
                            key={index}
                            background={item.background}
                            className={`slide${index + 1}`}
                            isLast={isLast}
                            item={item}
                            isMobile={isMobile}
                        />
                    );
                })}
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
                            className={`slide${index + 1}`}
                            isLast={isLast}
                            ref={lastSlideRef}
                            active={currentIndex}
                            handleClick={handleClick}
                            item={item}
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
