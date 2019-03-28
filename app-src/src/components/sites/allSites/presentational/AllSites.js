import React from 'react';
import { Link } from 'react-router-dom';

import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import SitesTableContainer from '../containers/SitesTableContainer';
import Block from 'components/shared/generic/block/presentational/Block';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllSites = () => (
    <>
        <PageHeading title="Sites">
            <Link to="/sites/create" className="button">
                <i className="far fa-plus" /> Add site
            </Link>
        </PageHeading>

        <Block>
            <SitesFiltersContainer />
        </Block>

        <SitesTableContainer />
    </>
);

export default AllSites;
