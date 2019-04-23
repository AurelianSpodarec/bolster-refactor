import React from 'react';

import CompaniesTableContainer from '../../shared/containers/CompaniesTableContainer';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CompaniesFiltersContainer from '../../shared/containers/CompaniesFiltersContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AllCompanies = () => (
    <>
        <PageHeading title="Companies" />

        <BlockContainer>
            <BlockHeading title="Companies">
                <CompaniesFiltersContainer />
            </BlockHeading>

            <CompaniesTableContainer />
        </BlockContainer>
    </>
);

export default AllCompanies;
