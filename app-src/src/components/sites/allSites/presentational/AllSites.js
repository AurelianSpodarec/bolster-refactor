import React from 'react';
import { Link } from 'react-router-dom';

import BreadcrumbContainer from 'components/shared/generic/breadcrumb/containers/BreadcrumbContainer';
import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import SitesTableContainer from '../containers/SitesTableContainer';

const AllSites = () => (
    <div>
        <BreadcrumbContainer />
        <h1>All Sites</h1>
        <SitesFiltersContainer />
        <SitesTableContainer />
        <Link className="button" to="/buildings/1">
            View Building
        </Link>
        <Link className="button" to="/floors/1">
            View Floor
        </Link>
    </div>
);

export default AllSites;
