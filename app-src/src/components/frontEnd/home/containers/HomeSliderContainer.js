import React, { Component } from 'react';
import HomeSlider from '../presentational/HomeSlider';

class HomeSliderContainer extends Component {
    render() {
        let sliderSettings = {
            dots: true,
            infinite: true,
            speed: 1500,
            autoplay: true,
            arrows: false
        };

        return <HomeSlider sliderSettings={sliderSettings} />;
    }
}

export default HomeSliderContainer;
