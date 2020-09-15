import React from 'react';
import Slides from '../presentational/Slides';
import FrontEndButton from 'components/frontEnd/shared/buttons/presentational/FrontEndButton';
import { HomeSlidesList } from 'constants/frontEnd/homeSlides';

const HomeSlidesContainer = () => {
    return (
        <div className="home-slides-container">
            {HomeSlidesList.map((item, index) => (
                <Slides key={index} background={item.background}>
                    <div className="slide-content">
                        <h1 className="slide-title">{item.title}</h1>
                        <p className="slide-description">{item.description}</p>
                        <FrontEndButton>{item.buttonText}</FrontEndButton>
                    </div>
                </Slides>
            ))}
        </div>
    );
};

export default HomeSlidesContainer;
