import React from 'react';

import CompaniesTableContainer from '../containers/CompaniesTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllCompanies = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Companies' }]} />
        <PageHeading title="Companies" />
        <BlockContainer>
            <CompaniesTableContainer />
        </BlockContainer>
    </>
);

export default AllCompanies;
