import React from 'react';
import { connect } from 'react-redux';

import toggleBuildingExpanded from 'actions/shared/generic/tables/sync/toggleBuildingExpanded';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';

import BuildingsListItem from '../presentational/BuildingsListItem';
import reorderBuilding from 'actions/companyAdmin/buildings/sync/reorderBuilding';
import postBuildingsSort from 'actions/companyAdmin/buildings/async/postBuildingsSort';
import { formatPermissions } from 'components/companyAdmin/sites/allSites/containers/SitesListItemContainer';

const BuildingsListItemContainer = ({
    expandedBuildingIds,
    building,
    building: { accessType, permissions },
    colCount,
    toggleBuildingExpanded,
    reorderBuilding,
    postBuildingsSort,
    buildings,
    index
}) => (
    <BuildingsListItem
        index={index}
        id={building.id}
        building={building}
        isExpanded={expandedBuildingIds.includes(building.id)}
        colCount={colCount}
        toggleExpanded={() => toggleBuildingExpanded(building.id)}
        permissions={formatPermissions(permissions, accessType)}
        onMove={reorderBuilding}
        onDrop={() => postBuildingsSort(buildings)}
    />
);

const mapStateToProps = ({
    shared: {
        tablesReducer: { expandedBuildingIds }
    }
}) => ({
    expandedBuildingIds
});

const mapDispatchToProps = {
    reorderBuilding,
    postBuildingsSort,
    toggleBuildingExpanded
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuildingsListItemContainer);
