import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateBuildingsForm from '../presentational/CreateBuildingsForm';
import createBuildings from 'actions/companyAdmin/buildings/async/createBuildings';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies } from 'helpers/hook';

const CreateBuildingsFormContainer = ({
    siteID,
    hideModal,
    createBuildings,
    updateHierarchyAddState
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
        location: ''
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
        />
    );

    function handleSubmit() {
        const postBody = getPostBody();
        createBuildings({ ...postBody, siteID });
        hideModal();
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
};

const mapDispatchToProps = {
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
