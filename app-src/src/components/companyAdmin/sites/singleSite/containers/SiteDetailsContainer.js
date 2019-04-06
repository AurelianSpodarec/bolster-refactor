import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SiteStats from '../presentational/SiteStats';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SiteDetailsContainer extends Component {
    render() {
        const { site, error, isFetching, stats, isFetchingStats } = this.props;

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching || isFetchingStats}
                isEmpty={!site.id || !stats.statuses}
            >
                <SiteStats site={site} stats={stats} />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    { companyAdmin: { sitesReducer, statsReducer } },
    { match }
) => ({
    site: sitesReducer.sites[match.params.id] || {},
    isFetching: sitesReducer.isFetching,
    error: sitesReducer.error,
    isFetchingStats: statsReducer.isFetching,
    stats: statsReducer.stats
});

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(SiteDetailsContainer)
);
