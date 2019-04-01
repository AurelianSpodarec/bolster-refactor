import React from 'react';

import CompaniesTableContainer from '../../shared/containers/CompaniesTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CompaniesFiltersContainer from '../../shared/containers/CompaniesFiltersContainer';

const AllCompanies = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Companies' }]} />
        <PageHeading title="Companies" />
        <BlockContainer>
            <CompaniesFiltersContainer />
        </BlockContainer>
        <BlockContainer>
            <CompaniesTableContainer />
        </BlockContainer>
    </>
);

export default AllCompanies;
