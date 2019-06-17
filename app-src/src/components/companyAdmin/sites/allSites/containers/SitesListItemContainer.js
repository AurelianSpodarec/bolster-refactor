import React from 'react';
import { connect } from 'react-redux';

import toggleSiteExpanded from 'actions/shared/generic/tables/sync/toggleSiteExpanded';
import {
    ACCESS_TYPES,
    ACCESS_TYPES_VALUES
} from 'constants/companyAdmin/enums';

import SitesListItem from '../presentational/SitesListItem';
import reorderSite from 'actions/companyAdmin/sites/sync/reorderSite';
import postSitesSort from 'actions/companyAdmin/sites/async/postSitesSort';

const SitesListItemContainer = ({
    expandedSiteIds,
    site,
    site: { accessType, permissions },
    colCount,
    index,
    reorderSite,
    toggleSiteExpanded,
    postSitesSort,
    sites
}) => {
    return (
        <SitesListItem
            index={index}
            id={site.id}
            onMove={reorderSite}
            onDrop={() => postSitesSort(sites)}
            site={site}
            isExpanded={expandedSiteIds.includes(site.id)}
            colCount={colCount}
            toggleExpanded={() => toggleSiteExpanded(site.id)}
            permissions={formatPermissions(permissions, accessType)}
        />
    );
};

const mapStateToProps = ({
    shared: {
        tablesReducer: { expandedSiteIds }
    },
    companyAdmin: {
        sitesReducer: { sites }
    }
}) => ({
    expandedSiteIds,
    sites: Object.values(sites)
});

const mapDispatchToProps = { reorderSite, toggleSiteExpanded, postSitesSort };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SitesListItemContainer);

export function formatPermissions(permissions, accessType) {
    if (!permissions && ACCESS_TYPES[accessType])
        return ACCESS_TYPES[accessType];

    return permissions
        .filter(p => p.accessType !== ACCESS_TYPES_VALUES.READ_ONLY)
        .map(p => `${p.companyName} ${ACCESS_TYPES[p.accessType]}`)
        .join(', ');
}
