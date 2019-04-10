import React from 'react';

import SitesFiltersContainer from '../containers/SitesFiltersContainer';
import SitesTableContainer from '../containers/SitesTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const AllSites = () => (
    <>
        <PageHeading title="Sites">
            <Breadcrumb breadcrumbs={[{ text: 'Sites' }]} />
        </PageHeading>

        <BlockContainer>
            <SitesFiltersContainer />
        </BlockContainer>

        <SitesTableContainer />
    </>
);

export default AllSites;
