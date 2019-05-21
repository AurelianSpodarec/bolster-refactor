import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorTableContainer from 'components/client/floors/shared/containers/FloorTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const BuildingsFloorsTableContainer = ({ building }) => (
    <BlockContainer>
        <BlockHeading title="Floors" classes="w-table" />
        <FloorTableContainer ids={building.floorIDs || []} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer,
            floorsReducer: { error }
        }
    },
    { match }
) => ({
    error,
    building: buildingsReducer.buildings[match.params.id] || {},
    isFetching: buildingsReducer.isFetching,
    buildingID: match.params.id
});

export default withRouter(
    connect(mapStateToProps)(BuildingsFloorsTableContainer)
);
