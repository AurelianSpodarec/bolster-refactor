import React from 'react';
import HomeSlides from '../presentational/HomeSlides';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import { HomeSlidesList } from 'constants/frontEnd/homeSlides';

const HomeSlidesContainer = () => {
    return (
        <div className={'home-slides-container'}>
            {HomeSlidesList.map((item, index) => {
                return (
                    <HomeSlides key={index} background={item.background}>
                        <div className="slide-content">
                            <h1 className="slide-title">{item.title}</h1>
                            <p className="slide-description">{item.description}</p>
                            <FrontEndButton type="button">{item.buttonText}</FrontEndButton>
                        </div>
                    </HomeSlides>
                );
            })}
        </div>
    );
};

export default HomeSlidesContainer;
