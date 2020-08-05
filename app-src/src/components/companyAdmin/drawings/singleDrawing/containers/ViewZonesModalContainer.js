import React, { useState } from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import setZoneAddMode from 'actions/companyAdmin/zones/sync/setZoneAddMode';

import ViewZonesModal from '../presentational/ViewZonesModal';
import {
    ZONE_DETAILS,
    CONFIRM_DELETE,
    VIEW_ZONES,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import deleteZone from 'actions/companyAdmin/zones/async/deleteZone';

const ViewZonesModalContainer = ({
    hideModal,
    showModal,
    setZoneAddMode,
    zones,
    deleteZone,
}) => {
    const [selectedQR, selectQR] = useState(null);

    return (
        <ViewZonesModal
            hideModal={hideModal}
            addZone={addZone}
            zonesArr={Object.values(zones)}
            selectedQR={selectedQR}
            selectQR={selectQR}
            handleShowZoneDetails={handleShowZoneDetails}
            confirmDelete={confirmDelete}
        />
    );

    function confirmDelete(id) {
        showModal(CONFIRM_DELETE, {
            handleDelete: () => handleDelete(id),
            handleCancel: () => showModal(VIEW_ZONES),
        });
    }

    async function handleDelete(id) {
        const { drawingID } = zones[id];
        const { success } = await deleteZone(drawingID, id);
        if (success) showModal(VIEW_ZONES);
        else showModal(ERROR_MODAL);
    }

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
        zonesReducer: { zones },
    },
}) => ({
    zones,
});

const mapDispatchToProps = {
    hideModal,
    showModal,
    setZoneAddMode,
    deleteZone,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewZonesModalContainer);
