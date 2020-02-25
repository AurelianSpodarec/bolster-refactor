import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PinQRCode = ({ pin }) => {
    if (!pin.qrCode) return <></>;

    return <BlockContainer>
        <BlockHeading classes="underline-full" title='QR Code' />
    </BlockContainer>;
};

export default PinQRCode;

