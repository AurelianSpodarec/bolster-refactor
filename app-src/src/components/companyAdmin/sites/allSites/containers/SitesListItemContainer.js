import React from 'react';
import { connect } from 'react-redux';

import toggleSiteExpanded from 'actions/shared/generic/tables/sync/toggleSiteExpanded';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';

import SitesListItem from '../presentational/SitesListItem';
import { sortSites } from 'actions/companyAdmin/sites/async/sortSites';

const SitesListItemContainer = ({
    dispatch,
    expandedSiteIds,
    site,
    site: { accessType, permissions },
    colCount,
    index,
    sortSites
}) => {
    return (
        <SitesListItem
            index={index}
            id={site.id}
            moveItem={sortSites}
            site={site}
            isExpanded={expandedSiteIds.includes(site.id)}
            colCount={colCount}
            toggleExpanded={() => dispatch(toggleSiteExpanded(site.id))}
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

const mapDispatchToProps = { sortSites };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SitesListItemContainer);
