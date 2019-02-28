import React from 'react';

import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import SitesListContainer from '../containers/SitesListContainer';

const AllSites = () => (
    <div>
        <h1>All Sites</h1>
        <SitesFiltersContainer />
        <div className="content-area size-lg-12">
            <SitesListContainer />
        </div>
    </div>
);

export default AllSites;
