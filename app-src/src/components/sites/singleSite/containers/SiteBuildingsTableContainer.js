import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BuildingsTableContainer from 'components/buildings/shared/containers/BuildingsTableContainer';

const SiteBuildingsTableContainer = ({ site }) => (
    <BuildingsTableContainer ids={site.buildingIds || []} />
);

export default withRouter(
    connect(({ sitesReducer }, { match }) => ({
        site: sitesReducer.sites[match.params.id] || {}
    }))(SiteBuildingsTableContainer)
);
