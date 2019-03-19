import React from 'react';
import { Link } from 'react-router-dom';

import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import SitesTableContainer from '../containers/SitesTableContainer';
import Block from 'components/shared/generic/block/presentational/Block';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllSites = () => (
    <>
        <PageHeading title="Add Sites">
            <Link to="/sites/add-site" className="button">
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
