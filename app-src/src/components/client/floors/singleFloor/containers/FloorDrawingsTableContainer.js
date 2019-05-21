import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DrawingTableContainer from 'components/client/drawings/shared/containers/DrawingTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const FloorDrawingsTableContainer = ({ floor }) => (
    <BlockContainer>
        <BlockHeading title="Drawings" classes="w-table" />
        <DrawingTableContainer ids={floor.drawingIDs || []} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer,
            drawingsReducer: { error }
        }
    },
    { match }
) => ({
    error,
    floor: floorsReducer.floors[match.params.id] || {},
    isFetching: floorsReducer.isFetching,
    floorID: match.params.id
});

export default withRouter(
    connect(mapStateToProps)(FloorDrawingsTableContainer)
);
