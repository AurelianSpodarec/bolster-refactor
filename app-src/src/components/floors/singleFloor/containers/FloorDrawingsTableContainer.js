import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DrawingTableContainer from 'components/drawings/shared/containers/DrawingTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const FloorDrawingsTableContainer = ({ floor }) => (
    <BlockContainer>
        <DrawingTableContainer ids={floor.drawingIDs || []} />
    </BlockContainer>
);

export default withRouter(
    connect(({ floorsReducer }, { match }) => ({
        floor: floorsReducer.floors[match.params.id] || {},
        isFetching: floorsReducer.isFetching
    }))(FloorDrawingsTableContainer)
);
