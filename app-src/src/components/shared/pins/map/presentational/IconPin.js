import React from 'react';

import { iconPinImgs } from '_content/images/map-markers';
import placeholder from '_content/images/layout/loading.gif';
import { RAW_S3_STORAGE_URL } from 'config';

const IconPin = ({ pinColour = 'red', excluded = false, icon }) => {
    return (
        <div className="icon-pin" style={{ opacity: excluded ? 0.5 : 1 }}>
            <img
                className="icon"
                src={icon ? `${RAW_S3_STORAGE_URL}/${icon}` : placeholder}
                alt={'icon'}
            />
            <img alt={`${pinColour} pin`} src={iconPinImgs[pinColour]} />
        </div>
    );
};

export default IconPin;
