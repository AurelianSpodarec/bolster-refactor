import React, { useState } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import setZoneAddMode from 'actions/companyAdmin/zones/sync/setZoneAddMode';

import ViewZonesModal from '../presentational/ViewZonesModal';
import { ZONE_DETAILS } from 'constants/shared/modalTypes';

const ViewZonesModalContainer = ({ hideModal, showModal, setZoneAddMode, zones }) => {
    const [selectedQR, selectQR] = useState(null);

    return (
        <ViewZonesModal
            hideModal={hideModal}
            addZone={addZone}
            zonesArr={Object.values(zones)}
            selectedQR={selectedQR}
            selectQR={selectQR}
            handleShowZoneDetails={handleShowZoneDetails}
        />
    );

    function handleShowZoneDetails(zone) {
        showModal(ZONE_DETAILS, { zone });
    }

    function addZone() {
        setZoneAddMode(true);
        hideModal();
    }
};

const mapStateToProps = ({
    companyAdmin: {
        zonesReducer: { zones }
    }
}) => ({
    zones
});

const mapDispatchToProps = {
    hideModal,
    showModal,
    setZoneAddMode
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewZonesModalContainer);
