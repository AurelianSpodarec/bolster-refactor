import React from 'react';

const CustomPin = ({ pinColour, pinCode, pinID, history }) => {
    const imageLocation = require(`_content/images/map-markers/${pinColour}-pin2x.png`);

    return (
        <a className="custom-pin" href={'/company/pins/' + pinID}>
            <img alt={`${pinColour} pin`} src={imageLocation} />
            <span className="code">{pinCode}</span>
        </a>
    );
};

export default CustomPin;
