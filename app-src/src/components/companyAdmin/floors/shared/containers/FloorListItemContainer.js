import React from 'react';
import { connect } from 'react-redux';

import toggleFloorExpanded from 'actions/shared/generic/tables/sync/toggleFloorExpanded';

import FloorListItem from '../presentational/FloorListItem';
import reorderFloor from 'actions/companyAdmin/floors/sync/reorderFloor';
import postFloorsSort from 'actions/companyAdmin/floors/async/postFloorsSort';
import { formatPermissions } from 'components/companyAdmin/sites/allSites/containers/SitesListItemContainer';

const FloorListItemContainer = ({
    expandedFloorIds,
    floor,
    floor: { accessType, permissions },
    colCount,
    index,
    floors,
    toggleFloorExpanded,
    postFloorsSort,
    reorderFloor,
    headers,
    onMobile
}) => {
    const isExpanded = expandedFloorIds.includes(floor.id);
    return (
        <FloorListItem
            index={index}
            id={floor.id}
            floor={floor}
            isExpanded={isExpanded}
            colCount={colCount}
            toggleExpanded={() => toggleFloorExpanded(floor.id)}
            permissions={formatPermissions(permissions, accessType)}
            onDrop={() => postFloorsSort(floors)}
            onMove={reorderFloor}
            headers={headers}
            onMobile={onMobile}
        />
    );
};

const mapStateToProps = ({
    shared: {
        tablesReducer: { expandedFloorIds },
        mobileReducer: { onMobile }
    }
}) => ({
    expandedFloorIds,
    onMobile
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
