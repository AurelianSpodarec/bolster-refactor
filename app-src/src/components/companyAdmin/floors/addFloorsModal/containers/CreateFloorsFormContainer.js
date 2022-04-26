import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateFloorsForm from '../presentational/CreateFloorsForm';
import createFloors from 'actions/companyAdmin/floors/async/createFloors';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies } from 'helpers/hooks';
import createFloor from 'actions/companyAdmin/floors/async/createFloor';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const CreateFloorsFormContainer = ({
    buildingID,
    hideModal,
    createFloor,
    createFloors,
    updateHierarchyAddState,
    isUsingBolsterLabels,
    building,
    error,
    isFetchingHierarchies,
}) => {
    const [floors, updateFloor, addFloor, removeFloor, getKeys, getPostBody] =
        useMultipleHierarchies({
            name: '',
        });

    return (
        <BlockContainer error={error} contentClass="no-padding no-border">
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
                buildingName={building.name}
                isFetchingHierarchies={isFetchingHierarchies}
            />
        </BlockContainer>
    );

    function handleSubmit() {
        const floors = getPostBody();

        if (floors.length === 1) {
            const [floor] = floors;
            const { name } = floor;

            createFloor({
                name,
                buildingID,
            });
        }
        if (floors.length > 1) {
            const formattedFloors = floors.map(floor => {
                const { name } = floor;

                return {
                    name,
                    buildingID,
                };
            });
            createFloors({ floors: formattedFloors, buildingID });
        }
        hideModal();
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
};

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: { buildingError, buildings, isFetching: isFetchingBuildings },
            floorsReducer: { isFetching: isFetchingFloors },
            drawingsReducer: { isFetching: isFetchingDrawings },
            companySettingsReducer: {
                companySettings: { isUsingBolsterLabels },
            },
            subscriptionsReducer: {
                subscriptions: { serviceIDs: subscriptionServiceIDs },
            },
        },
    },
    { buildingID },
) => ({
    isUsingBolsterLabels,
    error: buildingError,
    building: buildings[buildingID],
    subscriptionServiceIDs,
    isFetchingHierarchies: isFetchingBuildings || isFetchingFloors || isFetchingDrawings,
});

const mapDispatchToProps = {
    createFloor,
    createFloors,
    hideModal,
    updateHierarchyAddState,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateFloorsFormContainer));
