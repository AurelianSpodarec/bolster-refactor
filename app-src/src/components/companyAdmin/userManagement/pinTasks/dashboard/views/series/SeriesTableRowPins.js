import React, { useState } from 'react';

const SeriesTableRowPins = ({ pinCount, pinCodes }) => {
    const [expanded, setExpanded] = useState(false);

    if (!expanded)
        return (
            <button className="button blue" onClick={() => setExpanded(true)}>
                Click to view ({pinCount})
            </button>
        );

    return pinCodes.map(pinCode => (
        <div key={pinCode} onClick={() => setExpanded(false)}>
            {pinCode}
            <br />
        </div>
    ));
};

export default SeriesTableRowPins;
