import React from 'react';
import { connect } from 'react-redux';

import toggleFloorExpanded from 'actions/shared/generic/tables/sync/toggleFloorExpanded';

import FloorListItem from '../presentational/FloorListItem';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';

const FloorListItemContainer = ({
    dispatch,
    expandedFloorIds,
    floor,
    floor: { accessType, permissions },
    colCount
}) => (
    <FloorListItem
        floor={floor}
        isExpanded={expandedFloorIds.includes(floor.id)}
        colCount={colCount}
        toggleExpanded={() => dispatch(toggleFloorExpanded(floor.id))}
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
    />
);

export default connect(
    ({
        shared: {
            tablesReducer: { expandedFloorIds }
        }
    }) => ({
        expandedFloorIds
    })
)(FloorListItemContainer);
