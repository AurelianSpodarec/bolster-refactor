import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SitePageHeader from '../presentational/StiePageHeader';

const SitePageHeaderContainer = ({ site }) => <SitePageHeader site={site} />;

export default withRouter(
    connect(({ sitesReducer }, ownProps) => ({
        site: sitesReducer.sites[ownProps.match.params.id] || {}
    }))(SitePageHeaderContainer)
);
