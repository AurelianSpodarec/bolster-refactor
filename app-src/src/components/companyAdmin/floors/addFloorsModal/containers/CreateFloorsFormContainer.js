import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateFloorsForm from '../presentational/CreateFloorsForm';
import createFloors from 'actions/companyAdmin/floors/async/createFloors';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies } from 'helpers/hooks';
import createFloor from 'actions/companyAdmin/floors/async/createFloor';

const CreateFloorsFormContainer = ({
    buildingID,
    hideModal,
    createFloor,
    createFloors,
    updateHierarchyAddState,
    isUsingBolsterLabels
}) => {
    const [
        floors,
        updateFloor,
        addFloor,
        removeFloor,
        getKeys,
        getPostBody
    ] = useMultipleHierarchies({
        name: '',
        isAlertShowing: false,
        message: '',
        dateToSend: ''
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
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
    );

    function handleSubmit() {
        const floors = getPostBody();
        if (floors.length === 1) {
            const [floor] = floors;
            const { name, dateToSend, message } = floor;
            createFloor({ name, buildingID, message, dateToSend });
        }
        if (floors.length > 1) {
            createFloors({ floors, buildingID });
        }
        hideModal();
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
};

const mapDispatchToProps = {
    createFloor,
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
