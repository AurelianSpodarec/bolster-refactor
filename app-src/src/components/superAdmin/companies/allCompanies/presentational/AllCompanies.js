import React from 'react';

import CompaniesTableContainer from '../../shared/containers/CompaniesTableContainer';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CompaniesFiltersContainer from '../../shared/containers/CompaniesFiltersContainer';

const AllCompanies = () => (
    <>
        <PageHeading title="Companies" withBackButton />
        <BlockContainer>
            <CompaniesFiltersContainer />
        </BlockContainer>
        <BlockContainer>
            <CompaniesTableContainer />
        </BlockContainer>
    </>
);

export default AllCompanies;
