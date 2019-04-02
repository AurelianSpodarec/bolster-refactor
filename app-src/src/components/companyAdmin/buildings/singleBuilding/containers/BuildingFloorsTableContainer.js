import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorTableContainer from 'components/floors/shared/containers/FloorTableContainer';

const BuildingsFloorsTableContainer = ({ building }) => (
    <BlockContainer>
        <FloorTableContainer ids={building.floorIDs || []} />
    </BlockContainer>
);

export default withRouter(
    connect(({ buildingsReducer }, ownProps) => ({
        building: buildingsReducer.buildings[ownProps.match.params.id] || {},
        isFetching: buildingsReducer.isFetching
    }))(BuildingsFloorsTableContainer)
);
