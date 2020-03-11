import React from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import setZoneAddMode from 'actions/companyAdmin/zones/sync/setZoneAddMode';

import ViewZonesModal from '../presentational/ViewZonesModal';

const ViewZonesModalContainer = ({ hideModal, setZoneAddMode, drawing }) => {
    return <ViewZonesModal hideModal={hideModal} addZone={addZone} />;

    function addZone() {
        setZoneAddMode(true);
        hideModal();
    }
};

const mapDispatchToProps = {
    hideModal,
    setZoneAddMode,
};

export default connect(null, mapDispatchToProps)(ViewZonesModalContainer);

