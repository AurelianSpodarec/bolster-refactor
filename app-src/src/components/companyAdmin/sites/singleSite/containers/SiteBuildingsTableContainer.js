import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BuildingsTableContainer from 'components/companyAdmin/buildings/shared/containers/BuildingsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const SiteBuildingsTableContainer = ({ site }) => (
    <BlockContainer>
        <BuildingsTableContainer ids={site.buildingIDs || []} />
    </BlockContainer>
);

export default withRouter(
    connect(({ companyAdmin: { sitesReducer } }, { match }) => ({
        site: sitesReducer.sites[match.params.id] || {},
        isFetching: sitesReducer.isFetching
    }))(SiteBuildingsTableContainer)
);
