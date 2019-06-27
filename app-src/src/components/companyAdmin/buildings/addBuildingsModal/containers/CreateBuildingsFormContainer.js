import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateBuildingsForm from '../presentational/CreateBuildingsForm';
import createBuildings from 'actions/companyAdmin/buildings/async/createBuildings';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies } from 'helpers/hooks';
import createBuilding from 'actions/companyAdmin/buildings/async/createBuilding';

const CreateBuildingsFormContainer = ({
    siteID,
    hideModal,
    createBuilding,
    createBuildings,
    updateHierarchyAddState,
    isUsingBolsterLabels
}) => {
    const [
        buildings,
        updateBuilding,
        addBuilding,
        removeBuilding,
        getKeys,
        getPostBody
    ] = useMultipleHierarchies({
        name: '',
        location: '',
        isAlertShowing: false,
        alertMessage: '',
        alertDate: null
    });
    return (
        <CreateBuildingsForm
            buildings={Object.values(buildings)}
            updateBuilding={updateBuilding}
            addBuilding={addBuilding}
            removeBuilding={removeBuilding}
            buildingIDs={getKeys()}
            getKeys
            siteID={siteID}
            hideModal={hideModal}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
    );

    function handleSubmit() {
        const buildings = getPostBody();
        if (buildings.length === 1) {
            const [building] = buildings;
            const { name, location } = building;
            createBuilding({ name, location, siteID });
        }
        if (buildings.length > 1) {
            createBuildings({ buildings, siteID });
        }
        hideModal();
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
};
const mapDispatchToProps = {
    createBuilding,
    createBuildings,
    hideModal,
    updateHierarchyAddState
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(CreateBuildingsFormContainer)
);
