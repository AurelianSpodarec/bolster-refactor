import React from 'react';
import { connect } from 'react-redux';

import toggleSiteExpanded from 'actions/shared/generic/tables/sync/toggleSiteExpanded';

import SitesListItem from '../presentational/SitesListItem';

const SitesListItemContainer = ({
    dispatch,
    expandedSiteIds,
    site,
    colCount,
    headers,
    onMobile
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

export default connect(
    ({
        shared: {
            tablesReducer: { expandedSiteIds },
            mobileReducer: { onMobile }
        }
    }) => ({
        expandedSiteIds,
        onMobile
    })
)(SitesListItemContainer);
