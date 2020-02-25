import React from 'react';
import QRCode from 'qrcode.react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PinQRCode = ({ pin }) => {
    if (!pin.qrCode) return <></>;

    return <BlockContainer>
        <BlockHeading classes="underline-full" title='QR Code' />
        <div className="qr-container">
            <QRCode value={pin.qrCode} size={90} />
            <p>
                This pin has a QR code attached.
                <br /><br />
                Scan this code on the Bolster app to view it on there.
            </p>
        </div>
    </BlockContainer>;
};

export default PinQRCode;

