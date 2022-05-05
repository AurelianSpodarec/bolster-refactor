import React, { useEffect, useState } from 'react';
import FlexWrapper from '../../flexWrapper/FlexWrapper';

const RangeSlider = ({ min, max, step = 1, value, name, handleChange }) => {
    const calculateProgress = value => {
        return Math.round(((value - min) / (max - min)) * 100);
    };

    const [sliderProgress, setSliderProgress] = useState(calculateProgress(value));

    useEffect(() => {
        setSliderProgress(calculateProgress(value));
    }, []);

    const handleSliderChange = ({ target: { value: targetValue } }) => {
        setSliderProgress(calculateProgress(targetValue));
        handleChange(name, targetValue);
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
                step={step}
                value={value}
                className="slider"
                onChange={handleSliderChange}
                style={{
                    background: `linear-gradient(to right, #3364DD 0%, #3364DD ${sliderProgress}%, transparent ${sliderProgress}%, transparent 100%)`,
                }}
            />
        </div>
    );
};

export default RangeSlider;
