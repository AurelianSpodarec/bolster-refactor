import React from 'react';
import { connect } from 'react-redux';
import DrawingListItem from '../presentational/DrawingListItem';
import reorderDrawing from 'actions/companyAdmin/drawings/sync/reorderDrawing';
import postDrawingsSort from 'actions/companyAdmin/drawings/async/postDrawingsSort';
import { formatPermissions } from 'components/companyAdmin/sites/allSites/containers/SitesListItemContainer';

const DrawingListItemContainer = ({
    index,
    drawings,
    drawing,
    drawing: { permissions, accessType, id },
    reorderDrawing,
    postDrawingsSort,
    headers,
    onMobile,
    connectDropTarget,
    isSorting,
    ...rest
}) => {
    return (
        <DrawingListItem
            {...rest}
            index={index}
            id={id}
            drawing={drawing}
            permissions={formatPermissions(permissions, accessType)}
            onMove={moveItem}
            onDrop={() => postDrawingsSort(drawings)}
            headers={headers}
            onMobile={onMobile}
            connectDropTarget={connectDropTarget}
            isSorting={isSorting}
        />
    );

    function moveItem(overindex, fromIndex) {
        const items = [...drawings];
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1 }));
        reorderDrawing(sorted);
    }
};

const mapDispatchToProps = { reorderDrawing, postDrawingsSort };

export default connect(
    ({
        companyAdmin: {
            hierarchyReducer: { isSorting },
        },
        shared: {
            mobileReducer: { onMobile },
        },
    }) => ({
        isSorting,
        onMobile,
    }),
    mapDispatchToProps,
)(DrawingListItemContainer);
