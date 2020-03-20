import React from 'react';
import QRCode from 'qrcode.react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ZoneListItem from './ZoneListItem';
import ModalOuter from 'components/shared/generic/modals/presentational/ModalOuter';

const ViewZonesModal = ({ hideModal, addZone, zonesArr, selectedQR, selectQR }) => (
    <ModalOuterContainer>
        <BlockHeading title="View zones"></BlockHeading>

        {zonesArr.length ?
            <div className="zones-list size-lg-12">
                <div className="headings size-lg-12">
                    <p className="item size-lg-6">
                        <strong>Name</strong>
                    </p>
                    <p className="item size-lg-3">
                        <strong>Colour</strong>
                    </p>
                    <p className="item size-lg-3">
                        <strong>QR Code</strong>
                    </p>
                </div>

                {zonesArr.map(zone => <ZoneListItem key={zone.id} zone={zone} selectQR={selectQR} />)}
            </div> : <p className="generic-text no-data size-lg-12">No zones were found</p>
        }

        {selectedQR && <ModalOuter hideCloseButton extraClasses='qr-view'>
            <QRCode value={selectedQR} size={200} />
            <button className='button grey pull-right' onClick={() => selectQR(null)}>
                Close
            </button>
        </ModalOuter>}


        <BlockButtonWrapper>
            <button className="button green" onClick={addZone}>
                <i className="fa fa-plus" /> Add Zone
            </button>
            <button className="button grey" onClick={hideModal}>
                Cancel
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

export default ViewZonesModal;
