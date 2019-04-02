import React from 'react';
import { connect } from 'react-redux';

import toggleFloorExpanded from 'actions/shared/generic/tables/sync/toggleFloorExpanded';

import FloorListItem from '../presentational/FloorListItem';

const FloorListItemContainer = ({
    dispatch,
    expandedFloorIds,
    floor,
    colCount
}) => (
    <FloorListItem
        floor={floor}
        isExpanded={expandedFloorIds.includes(floor.id)}
        colCount={colCount}
        toggleExpanded={() => dispatch(toggleFloorExpanded(floor.id))}
    />
);

export default connect(({ tablesReducer: { expandedFloorIds } }) => ({
    expandedFloorIds
}))(FloorListItemContainer);
