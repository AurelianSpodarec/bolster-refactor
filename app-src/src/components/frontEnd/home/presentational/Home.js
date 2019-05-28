import React from 'react';

import HomeSliderContainer from '../containers/HomeSliderContainer';
import sliderBackground from '_content/images/frontend/gradient-slider.png';
import HowItWorks from '../presentational/HowItWorks';

export default function Home() {
    const sliderStyle = {
        backgroundImage: `url(${sliderBackground})`
    };

    return (
        <>
            <div className="slider-container" style={sliderStyle}>
                <div className="container">
                    <HomeSliderContainer />
                </div>
            </div>
            <HowItWorks />
        </>
    );
}
