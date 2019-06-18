import React from 'react';
import Slider from 'react-slick';

import { RAW_S3_STORAGE_URL } from 'config';

let sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false
};

const MapPinPhotoSlider = ({ pinImages }) => {
    return (
        <Slider {...sliderSettings}>
            {pinImages.map(src => (
                <div key={src}>
                    <img
                        style={{ width: '230px' }}
                        alt=""
                        src={`${RAW_S3_STORAGE_URL}/${src}`}
                    />
                </div>
            ))}
        </Slider>
    );
};

export default MapPinPhotoSlider;
