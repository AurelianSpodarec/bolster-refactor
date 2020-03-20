import React from 'react';

const ZoneListItem = ({ zone, selectQR }) => (
    <div className='zone size-lg-12'>
        <div className="item size-lg-6">
            <p>{zone.name}</p>
        </div>
        <div className="item size-lg-3">
            <div className='colour-box' style={{ backgroundColor: zone.colorHex }}></div>
        </div>
        <div className="item size-lg-3">
            {zone.qrCode ? <button className='button blue' onClick={() => selectQR(zone.qrCode)}>View</button> : <p>No QR Code attached</p>}
        </div>
    </div>
);

export default ZoneListItem;