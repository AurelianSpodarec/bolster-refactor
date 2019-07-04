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
    ...rest
}) => (
    <DrawingListItem
        {...rest}
        index={index}
        id={id}
        drawing={drawing}
        permissions={formatPermissions(permissions, accessType)}
        onMove={reorderDrawing}
        onDrop={() => postDrawingsSort(drawings)}
        headers={headers}
        onMobile={onMobile}
    />
);

const mapDispatchToProps = { reorderDrawing, postDrawingsSort };

export default connect(
    ({
        shared: {
            mobileReducer: { onMobile }
        }
    }) => ({
        onMobile
    }),
    mapDispatchToProps
)(DrawingListItemContainer);
