import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateBuildingsForm from '../presentational/CreateBuildingsForm';
import createBuildings from 'actions/companyAdmin/buildings/async/createBuildings';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies } from 'helpers/hooks';
import createBuilding from 'actions/companyAdmin/buildings/async/createBuilding';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const CreateBuildingsFormContainer = ({
    siteID,
    hideModal,
    createBuilding,
    createBuildings,
    updateHierarchyAddState,
    isUsingBolsterLabels,
    site,
    error,
    isFetchingHierarchies,
}) => {
    const [buildings, updateBuilding, addBuilding, removeBuilding, getKeys, getPostBody] =
        useMultipleHierarchies({
            name: '',
            location: '',
        });

    return (
        <BlockContainer error={error} contentClass="no-padding no-border">
            <CreateBuildingsForm
                buildings={Object.values(buildings)}
                updateBuilding={updateBuilding}
                addBuilding={addBuilding}
                removeBuilding={removeBuilding}
                buildingIDs={getKeys()}
                getKeys
                siteID={siteID}
                siteName={site.name}
                hideModal={hideModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                isUsingBolsterLabels={isUsingBolsterLabels}
                isFetchingHierarchies={isFetchingHierarchies}
            />
        </BlockContainer>
    );

    function handleSubmit() {
        const buildings = getPostBody();

        if (buildings.length === 1) {
            const [building] = buildings;
            const { name, location } = building;

            createBuilding({
                name,
                location,
                siteID,
            });
        }

        if (buildings.length > 1) {
            const formattedBuildings = buildings.map(building => {
                const { name, location } = building;

                return {
                    name,
                    location,
                    siteID,
                };
            });

            createBuildings({ buildings: formattedBuildings, siteID });
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
            sitesReducer: { siteError, updatedSiteID, sites, isFetching: isFetchingSites },
            buildingsReducer: { isFetching: isFetchingBuildings },
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
    { siteID },
) => ({
    isUsingBolsterLabels,
    error: siteError,
    site: sites[siteID],
    updatedSiteID,
    subscriptionServiceIDs,
    isFetchingHierarchies:
        isFetchingSites || isFetchingBuildings || isFetchingFloors || isFetchingDrawings,
});

const mapDispatchToProps = {
    createBuilding,
    createBuildings,
    hideModal,
    updateHierarchyAddState,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CreateBuildingsFormContainer),
);
