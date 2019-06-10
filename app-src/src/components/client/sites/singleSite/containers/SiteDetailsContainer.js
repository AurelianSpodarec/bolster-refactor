import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SiteStats from '../presentational/SiteStats';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const SiteDetailsContainer = ({ site, error, isFetching, stats }) => (
    <BlockContainer
        error={error}
        isFetching={isFetching}
        isEmpty={!site.id || !stats.statuses}
    >
        <SiteStats site={site} stats={stats} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        client: {
            sitesReducer: { sites, isFetching, error },
            statsReducer: { stats, isFetching: fetchingStats }
        }
    },
    { match }
) => ({
    site: sites[match.params.id] || {},
    isFetching: isFetching || fetchingStats,
    error,
    stats,
    id: match.params.id
});

export default withRouter(connect(mapStateToProps)(SiteDetailsContainer));
