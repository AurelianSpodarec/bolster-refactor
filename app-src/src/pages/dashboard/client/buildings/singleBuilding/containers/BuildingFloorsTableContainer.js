import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import FloorTableContainer from 'pages/dashboard/client/floors/shared/containers/FloorTableContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';

const BuildingsFloorsTableContainer = ({ building }) => (
    <BlockContainer>
        <BlockHeading title="Floors" classes="w-table" />
        <FloorTableContainer ids={building.floorIDs || []} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        client: {
            buildingsReducer,
            floorsReducer: { error },
        },
    },
    { match },
) => ({
    error,
    building: buildingsReducer.buildings[match.params.id] || {},
    isFetching: buildingsReducer.isFetching,
    buildingID: match.params.id,
});

export default withRouter(connect(mapStateToProps)(BuildingsFloorsTableContainer));
