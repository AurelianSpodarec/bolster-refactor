import React from 'react';

import SitesListItemContainer from '../containers/SitesListItemContainer';

const AllCompanyAdminsList = ({ users, colCount }) =>
    users.map(site => (
        <SitesListItemContainer key={site.id} site={site} colCount={colCount} />
    ));

export default AllCompanyAdminsList;
