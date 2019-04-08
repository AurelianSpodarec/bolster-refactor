import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BuildingStats from '../presentational/BuildingStats';

class BuildingDetailsContainer extends Component {
    render() {
        const { building, stats, isFetching, error } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!building.id || !stats.statuses}
            >
                <BuildingStats building={building} stats={stats} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    { companyAdmin: { buildingsReducer, statsReducer } },
    { match }
) => ({
    building: buildingsReducer.buildings[match.params.id] || {},
    isFetching: buildingsReducer.isFetching || statsReducer.isFetching,
    error: buildingsReducer.error,
    stats: statsReducer.stats
});

export default withRouter(connect(mapStateToProps)(BuildingDetailsContainer));
