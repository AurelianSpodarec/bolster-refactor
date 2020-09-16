import React, { useState } from 'react';
import Slides from '../presentational/Slides';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import { HomeSlidesList } from 'constants/frontEnd/homeSlides';
import useInView from 'react-cool-inview';

const HomeSlidesContainer = () => {
    const [lockHomeSlides, setLockHomeSlides] = useState(true);
    const [unlockSlides, setUnlockSlides] = useState(false);

    const unlockSlidesFunc = () => setUnlockSlides(true);
    const lockSlidesFunc = () => setUnlockSlides(false);

    const { ref: homeSlidesRef } = useInView({
        threshold: 1,
        onEnter: () => {
            setLockHomeSlides(true);
        },
        onLeave: () => {
            setLockHomeSlides(false);
        },
    });

    return (
        <div
            ref={homeSlidesRef}
            className={`home-slides-container ${lockHomeSlides && !unlockSlides ? 'visible' : ''}`}
        >
            {HomeSlidesList.map((item, index) => {
                const lastSlide = index === HomeSlidesList.length - 1;
                return (
                    <Slides
                        key={index}
                        background={item.background}
                        last={lastSlide}
                        unlock={unlockSlidesFunc}
                        lock={lockSlidesFunc}
                    >
                        <div className="slide-content">
                            <h1 className="slide-title">{item.title}</h1>
                            <p className="slide-description">{item.description}</p>
                            <FrontEndButton type="button">{item.buttonText}</FrontEndButton>
                        </div>
                    </Slides>
                );
            })}
        </div>
    );
};

export default HomeSlidesContainer;
