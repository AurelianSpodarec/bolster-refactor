import React from 'react';
import { connect } from 'react-redux';

import toggleSiteExpanded from 'actions/shared/generic/tables/sync/toggleSiteExpanded';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';

import SitesListItem from '../presentational/SitesListItem';
import reorderSite from 'actions/companyAdmin/sites/sync/reorderSite';

const SitesListItemContainer = ({
    expandedSiteIds,
    site,
    site: { accessType, permissions },
    colCount,
    index,
    reorderSite,
    toggleSiteExpanded
}) => {
    return (
        <SitesListItem
            index={index}
            id={site.id}
            onMove={reorderSite}
            onDrop={() => console.log('drop')}
            site={site}
            isExpanded={expandedSiteIds.includes(site.id)}
            colCount={colCount}
            toggleExpanded={() => toggleSiteExpanded(site.id)}
            permissions={
                (!permissions && ACCESS_TYPES[accessType]) ||
                permissions
                    .map(
                        permission =>
                            `${permission.companyName} (${
                                ACCESS_TYPES[permission.accessType]
                            })`
                    )
                    .join(', ')
            }
        />
    );
};

const mapStateToProps = ({
    shared: {
        tablesReducer: { expandedSiteIds }
    }
}) => ({
    expandedSiteIds
});

const mapDispatchToProps = { reorderSite, toggleSiteExpanded };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SitesListItemContainer);
