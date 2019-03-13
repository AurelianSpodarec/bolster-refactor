import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Stats from 'components/shared/stats/presentational/Stats';

const SiteDetailsContainer = ({ site }) => <Stats details={site} />;

export default withRouter(
    connect(({ sitesReducer }, { match }) => ({
        site: sitesReducer.sites[match.params.id] || {}
    }))(SiteDetailsContainer)
);
