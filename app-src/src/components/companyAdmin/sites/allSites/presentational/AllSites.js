import React from 'react';
import { Link } from 'react-router-dom';

import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import SitesTableContainer from '../containers/SitesTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const AllSites = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Sites' }]} />

        <PageHeading title="Sites">
            <Link to="/company/sites/create" className="button">
                <i className="far fa-plus" /> Add site
            </Link>
        </PageHeading>

        <BlockContainer>
            <SitesFiltersContainer />
        </BlockContainer>

        <SitesTableContainer />
    </>
);

export default AllSites;
