import React from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import SitesTableContainer from '../containers/SitesTableContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const AllSites = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'Sites' }]} />
        <h1>All Sites</h1>
        <Block>
            <SitesFiltersContainer />
        </Block>

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
