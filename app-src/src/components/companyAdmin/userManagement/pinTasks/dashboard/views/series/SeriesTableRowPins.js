import React, { useState } from 'react';

const SeriesTableRowPins = ({ pinCount, pins }) => {
    const [expanded, setExpanded] = useState(false);

    if (!expanded)
        return (
            <button className="button blue" onClick={() => setExpanded(true)}>
                Click to view ({pinCount})
            </button>
        );

    return pins.map(pin => (
        <a href={`/company/pins/${pin.id}`} key={pin.pinCode} onClick={() => setExpanded(false)}>
            {pin.pinCode}
            <br />
        </a>
    ));
};

export default SeriesTableRowPins;
