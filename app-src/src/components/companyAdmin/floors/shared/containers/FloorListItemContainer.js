import React from 'react';
import { connect } from 'react-redux';

import toggleFloorExpanded from 'actions/shared/generic/tables/sync/toggleFloorExpanded';

import FloorListItem from '../presentational/FloorListItem';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';
import reorderFloor from 'actions/companyAdmin/floors/sync/reorderFloor';
import postFloorsSort from 'actions/companyAdmin/floors/async/postFloorsSort';

const FloorListItemContainer = ({
    expandedFloorIds,
    floor,
    floor: { accessType, permissions },
    colCount,
    index,
    floors,
    toggleFloorExpanded,
    postFloorsSort,
    reorderFloor
}) => (
    <FloorListItem
        index={index}
        id={floor.id}
        floor={floor}
        isExpanded={expandedFloorIds.includes(floor.id)}
        colCount={colCount}
        toggleExpanded={() => toggleFloorExpanded(floor.id)}
        permissions={
            (!permissions && ACCESS_TYPES[accessType]) ||
            permissions
                .map(
                    permission =>
                        `${permission.companyName} (${
                            ACCESS_TYPES[permission.accessType]
                        })`
                )
                .join(', ')
        }
        onDrop={() => postFloorsSort(floors)}
        onMove={reorderFloor}
    />
);

const mapStateToProps = ({
    shared: {
        tablesReducer: { expandedFloorIds }
    }
}) => ({
    expandedFloorIds
});

const mapDispatchToProps = {
    postFloorsSort,
    reorderFloor,
    toggleFloorExpanded
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FloorListItemContainer);
