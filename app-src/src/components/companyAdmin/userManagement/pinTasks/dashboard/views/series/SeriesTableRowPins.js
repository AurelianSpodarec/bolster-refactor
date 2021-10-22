import React, { useState } from 'react';

const SeriesTableRowPins = ({ pinCount, pinIDs }) => {
    const [expanded, setExpanded] = useState(false);

    if (!expanded)
        return (
            <button className="button blue" onClick={() => setExpanded(true)}>
                Click to view ({pinCount})
            </button>
        );

    return pinIDs.map(pinID => (
        <div key={pinID} onClick={() => setExpanded(false)}>
            {pinID}
            <br />
        </div>
    ));
};

export default SeriesTableRowPins;
