import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateFloorsForm from '../presentational/CreateFloorsForm';
import createFloors from 'actions/companyAdmin/floors/async/createFloors';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies } from 'helpers/hooks';

const CreateFloorsFormContainer = ({
    buildingID,
    hideModal,
    createFloors,
    updateHierarchyAddState
}) => {
    const [
        floors,
        updateFloor,
        addFloor,
        removeFloor,
        getKeys,
        getPostBody
    ] = useMultipleHierarchies({
        name: ''
    });
    return (
        <CreateFloorsForm
            floors={Object.values(floors)}
            updateFloor={updateFloor}
            addFloor={addFloor}
            removeFloor={removeFloor}
            floorIDs={getKeys()}
            getKeys
            buildingID={buildingID}
            hideModal={hideModal}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
        />
    );

    function handleSubmit() {
        const floors = getPostBody();
        createFloors({ floors, buildingID });
        hideModal();
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
};

const mapDispatchToProps = {
    createFloors,
    hideModal,
    updateHierarchyAddState
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(CreateFloorsFormContainer)
);
