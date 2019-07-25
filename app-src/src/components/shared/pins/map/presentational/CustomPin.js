import React from 'react';

const CustomPin = ({ pinColour = 'red', pinCode = '', excluded = false }) => {
    const imageLocation = require(`_content/images/map-markers/${pinColour}-pin2x.png`);
    const topCode = pinCode.slice(0, 4);
    const bottomCode = pinCode.slice(5);

    return (
        <div className="custom-pin" style={{ opacity: excluded ? 0.5 : 1 }}>
            <img alt={`${pinColour} pin`} src={imageLocation} />
            <div className="code">
                <p className="code-half">{topCode}</p>
                <p className="code-half">:{bottomCode}</p>
            </div>
        </div>
    );
};

export default CustomPin;
