import React from 'react';
import { connect } from 'react-redux';
import toggleSiteExpanded from 'actions/shared/generic/tables/sync/toggleSiteExpanded';

import SitesListItem from '../presentational/SitesListItem';
import postSitesSort from 'actions/companyAdmin/sites/async/postSitesSort';

const SitesListItemContainer = ({
    dispatch,
    expandedSiteIds,
    site,
    colCount,
    headers,
    onMobile,
}) => (
    <SitesListItem
        site={site}
        isExpanded={expandedSiteIds.includes(site.id)}
        colCount={colCount}
        toggleExpanded={() => dispatch(toggleSiteExpanded(site.id))}
        headers={headers}
        onMobile={onMobile}
    />
);

const mapState = ({ shared: { tablesReducer, mobileReducer } }) => ({
    expandedSiteIds: tablesReducer.expandedSiteIds,
    onMobile: mobileReducer.onMobile,
});
const mapDispatch = { postSitesSort };

export default connect(mapState, mapDispatch)(SitesListItemContainer);
