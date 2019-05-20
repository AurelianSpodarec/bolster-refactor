import React from 'react';

import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import SitesTableContainer from '../containers/SitesTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const AllSites = () => (
    <>
        <PageHeading title="Sites" withBackButton />

        <BlockContainer>
            <SitesFiltersContainer />
        </BlockContainer>

        <SitesTableContainer />
    </>
);

export default AllSites;
