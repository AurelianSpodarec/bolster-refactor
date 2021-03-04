import React from 'react';

import { pin2xImgs } from '_content/images/map-markers';

const CustomPin = ({ pinColour = 'red', pinCode = '', excluded = false }) => {
    const topCode = pinCode.slice(0, 4);
    const bottomCode = pinCode.slice(5);

    return (
        <div className="custom-pin" style={{ opacity: excluded ? 0.5 : 1 }}>
            <img alt={`${pinColour} pin`} src={pin2xImgs[pinColour]} />
            <div className="code">
                <p className="code-half">{topCode}</p>
                <p className="code-half">:{bottomCode}</p>
            </div>
        </div>
    );
};

export default CustomPin;
