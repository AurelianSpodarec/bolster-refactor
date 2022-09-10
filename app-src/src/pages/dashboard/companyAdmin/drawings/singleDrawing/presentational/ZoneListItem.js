import React from 'react';

import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';

const ZoneListItem = ({
    zone,
    selectQR,
    handleShowZoneDetails,
    confirmDelete,
    showEditZoneModal,
}) => (
    <div className="zone size-lg-12">
        <div className="item size-lg-4">
            <p>{zone.name}</p>
        </div>
        <div className="item size-lg-2">
            <div className="colour-box" style={{ backgroundColor: zone.colorHex }}></div>
        </div>
        <div className="item size-lg-3">
            {zone.qrCode ? (
                <ActionButton text="View QR" onClick={() => selectQR(zone.qrCode)} />
            ) : (
                <p>No QR Code attached</p>
            )}
        </div>
        <div className="item size-lg-3">
            <FlexWrapper gap={5}>
                <ActionButton text="View details" onClick={() => handleShowZoneDetails(zone)} />
                <ActionButton text="Edit" onClick={() => showEditZoneModal(zone.id)} />
                <ActionButton
                    text="Delete"
                    ambient="negative"
                    onClick={() => confirmDelete(zone.id)}
                />
            </FlexWrapper>
        </div>
    </div>
);

export default ZoneListItem;
