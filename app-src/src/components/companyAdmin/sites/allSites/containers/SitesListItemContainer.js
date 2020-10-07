import React from 'react';
import { connect } from 'react-redux';

import toggleSiteExpanded from 'actions/shared/generic/tables/sync/toggleSiteExpanded';
import {
    ACCESS_TYPES,
    ACCESS_TYPES_VALUES,
    DEFAULT_SITES_SORT,
} from 'constants/companyAdmin/enums';

import SitesListItem from '../presentational/SitesListItem';
import reorderSite from 'actions/companyAdmin/sites/sync/reorderSite';
import { hierarchySort } from 'helpers/generic';

const SitesListItemContainer = ({
    expandedSiteIds,
    site,
    site: { accessType, permissions },
    colCount,
    index,
    reorderSite,
    toggleSiteExpanded,
    postSitesSort,
    sites,
    headers,
    onMobile,
    sortBy,
    connectDropTarget,
    isSorting,
}) => {
    return (
        <SitesListItem
            index={index}
            id={site.id}
            onMove={moveItem}
            onDrop={postSitesSort}
            site={site}
            isExpanded={expandedSiteIds.includes(site.id)}
            colCount={colCount}
            toggleExpanded={() => toggleSiteExpanded(site.id)}
            permissions={formatPermissions(permissions, accessType)}
            headers={headers}
            onMobile={onMobile}
            connectDropTarget={connectDropTarget}
            isSorting={isSorting}
        />
    );

    function moveItem(overindex, fromIndex) {
        if (sortBy && sortBy != DEFAULT_SITES_SORT.CUSTOM) return;
        const items = [...sites].sort(hierarchySort);
        const [item] = items.splice(fromIndex, 1);
        items.splice(overindex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1 }));
        reorderSite(sorted);
    }
};

const mapStateToProps = ({
    shared: {
        tablesReducer: { expandedSiteIds },
        mobileReducer: { onMobile },
        sitesFilterReducer: {
            filters: { sortBy },
        },
    },
    companyAdmin: {
        sitesReducer: { sites },
    },
}) => ({
    expandedSiteIds,
    sites: Object.values(sites),
    onMobile,
    sortBy,
});

const mapDispatchToProps = { reorderSite, toggleSiteExpanded };

export default connect(mapStateToProps, mapDispatchToProps)(SitesListItemContainer);

export function formatPermissions(permissions, accessType) {
    if (!permissions && ACCESS_TYPES[accessType]) return ACCESS_TYPES[accessType];

    if (!permissions) return '';
    return permissions
        .filter(p => p.accessType !== ACCESS_TYPES_VALUES.READ_ONLY)
        .map(p => `${p.companyName} ${ACCESS_TYPES[p.accessType]}`)
        .join(', ');
}
