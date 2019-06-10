import React from 'react';
import { connect } from 'react-redux';

import toggleBuildingExpanded from 'actions/shared/generic/tables/sync/toggleBuildingExpanded';

import BuildingsListItem from '../presentational/BuildingsListItem';

const BuildingsListItemContainer = ({
    dispatch,
    expandedBuildingIds,
    building,
    colCount
}) => (
    <BuildingsListItem
        building={building}
        isExpanded={expandedBuildingIds.includes(building.id)}
        colCount={colCount}
        toggleExpanded={() => dispatch(toggleBuildingExpanded(building.id))}
    />
);

export default connect(
    ({
        shared: {
            tablesReducer: { expandedBuildingIds }
        }
    }) => ({
        expandedBuildingIds
    })
)(BuildingsListItemContainer);
