import React from 'react';
import { connect } from 'react-redux';

import toggleSiteExpanded from 'actions/shared/generic/tables/sync/toggleSiteExpanded';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';

import SitesListItem from '../presentational/SitesListItem';

const SitesListItemContainer = ({
    dispatch,
    expandedSiteIds,
    site,
    site: { accessType, permissions },
    colCount,
    index,
    moveItem
}) => (
    <SitesListItem
        index={index}
        id={site.id}
        moveItem={moveItem}
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

export default connect(
    ({
        shared: {
            tablesReducer: { expandedSiteIds }
        }
    }) => ({
        expandedSiteIds
    })
)(SitesListItemContainer);
