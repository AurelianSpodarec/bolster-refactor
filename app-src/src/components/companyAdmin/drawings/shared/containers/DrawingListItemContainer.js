import React from 'react';
import { connect } from 'react-redux';
import DrawingListItem from '../presentational/DrawingListItem';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';
import reorderDrawing from 'actions/companyAdmin/drawings/sync/reorderDrawing';
import postDrawingsSort from 'actions/companyAdmin/drawings/async/postDrawingsSort';

const DrawingListItemContainer = ({
    index,
    drawings,
    drawing,
    drawing: { permissions, accessType, id },
    reorderDrawing,
    postDrawingsSort,
    ...rest
}) => (
    <DrawingListItem
        {...rest}
        index={index}
        id={id}
        drawing={drawing}
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
        onMove={reorderDrawing}
        onDrop={() => postDrawingsSort(drawings)}
    />
);

const mapDispatchToProps = { reorderDrawing, postDrawingsSort };

export default connect(
    null,
    mapDispatchToProps
)(DrawingListItemContainer);
