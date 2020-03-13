import React from 'react';
import QRCode from 'qrcode.react';

const ZoneListItem = ({ zone }) => (
    <div className='zone size-lg-12'>
        <div className="item size-lg-6">
            <p>{zone.name}</p>
        </div>
        <div className="item size-lg-3">
            <div className='colour-box' style={{ backgroundColor: zone.colorHex }}></div>
        </div>
        <div className="item size-lg-3">
            {zone.qrCode ? <QRCode value={zone.qrCode} size={50} /> : <p>No QR Code attached</p>}
        </div>
    </div>
);

export default ZoneListItem;