import React, { useState } from 'react';
import FlexWrapper from '../../flexWrapper/FlexWrapper';

const RangeSlider = ({ min, max, value }) => {
    const [sliderProgress, setSliderProgress] = useState(50);

    const handleSliderChange = ({ target: { value } }) => {
        setSliderProgress(calculateProgress(value));
    };

    const calculateProgress = value => {
        return ((value - min) / (max - min)) * 100;
    };

    return (
        <div className="slide-container">
            <FlexWrapper justify="between">
                <p>£{min}</p>
                <p>£{max}</p>
            </FlexWrapper>

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                className="slider"
                onChange={handleSliderChange}
                style={{
                    background: `linear-gradient(to right, #3364DD 0%, #3364DD ${sliderProgress}%, white ${sliderProgress}%, white 100%)`,
                }}
            />
        </div>
    );
};

export default RangeSlider;
