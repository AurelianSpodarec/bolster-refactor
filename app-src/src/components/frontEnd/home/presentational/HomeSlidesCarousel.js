import React, { useRef, useCallback } from 'react';

import { useFullPageCarousel } from 'helpers/frontEndHooks';
import { HomeSlidesList } from 'constants/frontEnd/homeSlides';

import HomeSlidesCarouselItem from './HomeSlidesItem';
import HomeCarouselControls from './HomeCarouselControls';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';

const HomeSlidesCarousel = () => {
    const wrapperRef = useRef();
    const { currentIndex, handleClick } = useFullPageCarousel(wrapperRef);

    return (
        <>
            <div ref={wrapperRef} className="frontend-home-carousel">
                {HomeSlidesList.map((item, index) => (
                    <HomeSlidesCarouselItem
                        key={index}
                        background={item.background}
                        className={`slide${index + 1}`}
                    >
                        <div className="slide-content">
                            <h1 className="slide-title">{item.title}</h1>
                            <p className="slide-description">{item.description}</p>
                            <FrontEndButton type="button">{item.buttonText}</FrontEndButton>
                        </div>
                    </HomeSlidesCarouselItem>
                ))}
            </div>
            <HomeCarouselControls active={currentIndex} handleClick={handleClick} />
        </>
    );
};

export default HomeSlidesCarousel;
