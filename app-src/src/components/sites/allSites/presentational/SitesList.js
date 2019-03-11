import React from 'react';

import SitesListItem from '../presentational/SitesListItem';

const SitesList = ({ sites }) =>
    sites.map(site => <SitesListItem key={site.id} site={site} />);

export default SitesList;
