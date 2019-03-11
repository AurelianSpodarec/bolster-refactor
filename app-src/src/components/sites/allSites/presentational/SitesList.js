import React from 'react';

import SitesListItemContainer from '../containers/SitesListItemContainer';

const SitesList = ({ sites }) =>
    sites.map(site => <SitesListItemContainer key={site.id} site={site} />);

export default SitesList;
