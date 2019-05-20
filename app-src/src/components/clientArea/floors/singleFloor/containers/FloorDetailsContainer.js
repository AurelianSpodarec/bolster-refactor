import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorStats from '../presentational/FloorStats';

const FloorDetailsContainer = ({ floor, stats, error, isFetching }) => (
    <BlockContainer
        error={error}
        isFetching={isFetching}
        isEmpty={!floor.id || !stats.statuses}
    >
        <FloorStats floor={floor} stats={stats} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer: { floors, isFetching: fetchingFloors, error },
            statsReducer: { stats, isFetching: fetchingStats }
        }
    },
    { match }
) => ({
    floor: floors[match.params.id] || {},
    isFetching: fetchingFloors || fetchingStats,
    error,
    stats,

    id: match.params.id
});

export default withRouter(connect(mapStateToProps)(FloorDetailsContainer));
