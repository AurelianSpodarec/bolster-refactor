import React from 'react';
import QRCode from 'qrcode.react';

import ZoneListItem from './ZoneListItem';
import ModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/ModalOuter';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';

const ViewZonesModal = ({
    hideModal,
    addZone,
    zonesArr,
    selectedQR,
    selectQR,
    handleShowZoneDetails,
    confirmDelete,
    showEditZoneModal,
}) => {
    return (
        <FlexModalOuter title="View zones" extraClasses="zone-modal">
            <div className="flex-content-wrapper">
                <div className="flex-content">
                    {zonesArr.length ? (
                        <div className="zones-list size-lg-12">
                            <div className="headings size-lg-12">
                                <p className="item size-lg-4">
                                    <strong>Name</strong>
                                </p>
                                <p className="item size-lg-2">
                                    <strong>Colour</strong>
                                </p>
                                <p className="item size-lg-3">
                                    <strong>QR Code</strong>
                                </p>
                                <p className="item size-lg-3" />
                            </div>

                            {zonesArr.map(zone => (
                                <ZoneListItem
                                    key={zone.id}
                                    zone={zone}
                                    selectQR={selectQR}
                                    handleShowZoneDetails={handleShowZoneDetails}
                                    confirmDelete={confirmDelete}
                                    showEditZoneModal={showEditZoneModal}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="generic-text no-data size-lg-12">No zones were found</p>
                    )}

                    {selectedQR && (
                        <ModalOuter hideCloseButton extraClasses="qr-view">
                            <QRCode value={selectedQR} size={200} />
                            <div style={{ height: 5 }} />
                            <ButtonWrapper alignment="right">
                                <ActionButton text="Close" onClick={() => selectQR(null)} />
                            </ButtonWrapper>
                        </ModalOuter>
                    )}
                </div>
                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton text="Close" source="secondary" onClick={hideModal} />
                    <ActionButton
                        text="Add Zone"
                        ambient="positive"
                        icon="plus"
                        onClick={addZone}
                    />
                </ButtonWrapper>
            </div>
        </FlexModalOuter>
    );
};

export default ViewZonesModal;
