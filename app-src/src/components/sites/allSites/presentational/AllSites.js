import React from 'react';
import { Link } from 'react-router-dom';

import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import SitesListContainer from '../containers/SitesListContainer';

const AllSites = () => (
    <div>
        <h1>All Sites</h1>
        <SitesFiltersContainer />
        <SitesListContainer />
        <Link className="button" to="/buildings/1">
            View Building
        </Link>
        <Link className="button" to="/floors/1">
            View Floor
        </Link>
    </div>
);

export default AllSites;
