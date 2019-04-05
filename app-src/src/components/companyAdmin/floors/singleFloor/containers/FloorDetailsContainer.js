import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorStats from '../presentational/FloorStats';

class FloorDetailsContainer extends Component {
    render() {
        const { floor, stats, error, isFetching, isFetchingStats } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching || isFetchingStats}
                isEmpty={!floor.id || !stats.statuses}
            >
                <FloorStats floor={floor} stats={stats} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    { companyAdmin: { floorsReducer, statsReducer } },
    { match }
) => ({
    floor: floorsReducer.floors[match.params.id] || {},
    isFetching: floorsReducer.isFetching,
    error: floorsReducer.error,
    isFetchingStats: statsReducer.isFetching,
    stats: statsReducer.stats
});

export default withRouter(connect(mapStateToProps)(FloorDetailsContainer));
