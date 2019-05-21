import React from 'react';

import SitesListItemContainer from '../containers/SitesListItemContainer';

const SitesList = ({ sites, colCount }) =>
    sites.map(site => (
        <SitesListItemContainer key={site.id} site={site} colCount={colCount} />
    ));

export default SitesList;
