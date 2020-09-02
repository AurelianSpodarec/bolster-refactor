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
    onMobile,
    colSpanFirst,
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
            onMove={moveItem}
            headers={headers}
            onMobile={onMobile}
            colSpanFirst={colSpanFirst}
        />
    );

    function moveItem(overindex, fromIndex) {
        const items = [...floors];
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1 }));
        reorderFloor(sorted);
    }
};

const mapStateToProps = ({
    shared: {
        tablesReducer: { expandedFloorIds },
        mobileReducer: { onMobile },
    },
}) => ({
    expandedFloorIds,
    onMobile,
});

const mapDispatchToProps = {
    postFloorsSort,
    reorderFloor,
    toggleFloorExpanded,
};

export default connect(mapStateToProps, mapDispatchToProps)(FloorListItemContainer);
