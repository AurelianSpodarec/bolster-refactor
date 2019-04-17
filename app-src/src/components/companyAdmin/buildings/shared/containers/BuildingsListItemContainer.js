import React from 'react';
import { connect } from 'react-redux';

import toggleBuildingExpanded from 'actions/shared/generic/tables/sync/toggleBuildingExpanded';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';

import BuildingsListItem from '../presentational/BuildingsListItem';

const BuildingsListItemContainer = ({
    dispatch,
    expandedBuildingIds,
    building,
    building: { accessType, permissions },
    colCount
}) => (
    <BuildingsListItem
        building={building}
        isExpanded={expandedBuildingIds.includes(building.id)}
        colCount={colCount}
        toggleExpanded={() => dispatch(toggleBuildingExpanded(building.id))}
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
            tablesReducer: { expandedBuildingIds }
        }
    }) => ({
        expandedBuildingIds
    })
)(BuildingsListItemContainer);
