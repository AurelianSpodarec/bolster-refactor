import React from 'react';

const CustomPin = ({ pinColour, pinCode }) => {
    const imageLocation = require(`_content/images/map-markers/${pinColour}-pin2x.png`);

    return (
        <div className="custom-pin">
            <img alt={`${pinColour} pin`} src={imageLocation} />
            <span className="code">{pinCode}</span>
        </div>
    );
};

export default CustomPin;
