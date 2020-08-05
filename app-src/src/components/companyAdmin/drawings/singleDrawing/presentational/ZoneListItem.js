import React from 'react';

const ZoneListItem = ({
    zone,
    selectQR,
    handleShowZoneDetails,
    confirmDelete,
}) => (
    <div className="zone size-lg-12">
        <div className="item size-lg-4">
            <p>{zone.name}</p>
        </div>
        <div className="item size-lg-2">
            <div
                className="colour-box"
                style={{ backgroundColor: zone.colorHex }}
            ></div>
        </div>
        <div className="item size-lg-3">
            {zone.qrCode ? (
                <button
                    className="button blue"
                    onClick={() => selectQR(zone.qrCode)}
                >
                    View QR
                </button>
            ) : (
                <p>No QR Code attached</p>
            )}
        </div>
        <div className="item size-lg-3">
            <button
                className="button blue"
                onClick={() => handleShowZoneDetails(zone)}
            >
                View pins
            </button>
            <button
                className="button yellow"
                onClick={() => console.log('Edit')}
            >
                Edit
            </button>
            <button
                className="button red"
                onClick={() => confirmDelete(zone.id)}
            >
                Delete
            </button>
        </div>
    </div>
);

export default ZoneListItem;
