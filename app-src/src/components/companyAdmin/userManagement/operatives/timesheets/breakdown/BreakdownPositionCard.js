import { decimalToSexagesimal } from 'geolib';
import React from 'react';

const BreakdownPositionCard = ({ location, locationUnavailableReason }) => {
    const sexagesimal = {
        x: decimalToSexagesimal(location.x),
        y: decimalToSexagesimal(location.y),
    };
    return (
        <div className="breakdown-position-card">
            {location.isEmpty ? (
                <>
                    <p className="title">No location data available</p>
                    <p className="text">{locationUnavailableReason || 'Reason Unknown'}</p>
                </>
            ) : (
                <>
                    <p className="title">Lat Long</p>
                    <p className="text">
                        ({location.x}, {location.y})
                    </p>
                    <p className="title">GPS Coordinates</p>
                    <p className="text">
                        ({sexagesimal.x}, {sexagesimal.y})
                    </p>
                </>
            )}
        </div>
    );
};

export default BreakdownPositionCard;
