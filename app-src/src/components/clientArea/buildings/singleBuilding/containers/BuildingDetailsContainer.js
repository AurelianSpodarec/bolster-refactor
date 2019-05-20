import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BuildingStats from '../presentational/BuildingStats';

const BuildingDetailsContainer = ({ building, stats, isFetching, error }) => (
    <BlockContainer
        error={error}
        isFetching={isFetching}
        isEmpty={!building.id || !stats.statuses}
    >
        <BuildingStats building={building} stats={stats} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: {
                buildings,
                error,
                isFetching: fetchingBuildings
            },
            statsReducer: { stats, isFetching: fetchingStats }
        }
    },
    { match }
) => ({
    building: buildings[match.params.id] || {},
    isFetching: fetchingBuildings || fetchingStats,
    error,
    stats,

    id: match.params.id
});

export default withRouter(connect(mapStateToProps)(BuildingDetailsContainer));
