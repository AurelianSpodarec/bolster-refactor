import React, { useRef } from 'react';

import { useFullPageCarousel } from 'helpers/frontEndHooks';
import { HomeSlidesList } from 'constants/frontEnd/homeSlides';

import HomeSlidesItem from '../presentational/HomeSlidesItem';
import HomeCarouselControls from '../presentational/HomeCarouselControls';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

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
                        >
                            <div className="slide-content">
                                <h1 className="slide-title">{item.title}</h1>
                                <p className="slide-description">{item.description}</p>
                                <FrontEndButton type="button">{item.buttonText}</FrontEndButton>
                            </div>
                        </HomeSlidesItem>
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
                        >
                            <div className="slide-content">
                                <h1 className="slide-title">{item.title}</h1>
                                <p className="slide-description">{item.description}</p>
                                <FrontEndButton type="button">{item.buttonText}</FrontEndButton>
                            </div>
                        </HomeSlidesItem>
                    );
                })}
            </div>
            <HomeCarouselControls active={currentIndex} handleClick={handleClick} />
        </>
    );
};

export default HomeSlidesCarouselContainer;
