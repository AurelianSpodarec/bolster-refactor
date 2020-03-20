import React, { useState } from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import setZoneAddMode from 'actions/companyAdmin/zones/sync/setZoneAddMode';

import ViewZonesModal from '../presentational/ViewZonesModal';

const ViewZonesModalContainer = ({ hideModal, setZoneAddMode, zones }) => {
    const [selectedQR, selectQR] = useState(null);

    return (
        <ViewZonesModal
            hideModal={hideModal}
            addZone={addZone}
            zonesArr={Object.values(zones)}
            selectedQR={selectedQR}
            selectQR={selectQR}
        />
    );

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
    setZoneAddMode
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewZonesModalContainer);
