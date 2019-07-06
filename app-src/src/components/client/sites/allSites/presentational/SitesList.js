import React from 'react';

import SitesListItemContainer from '../containers/SitesListItemContainer';

const SitesList = ({ sites, colCount, headers }) =>
    sites.map(site => (
        <SitesListItemContainer
            key={site.id}
            site={site}
            colCount={colCount}
            headers={headers}
        />
    ));

export default SitesList;
