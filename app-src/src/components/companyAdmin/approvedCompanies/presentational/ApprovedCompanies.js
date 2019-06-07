import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import ApprovedCompaniesListContainer from '../containers/ApprovedCompaniesListContainer';

import ApprovedCompaniesFiltersContainer from '../containers/ApprovedCompaniesFiltersContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const ApprovedCompanies = () => (
    <>
        <PageHeading title="Bolster Approved Companies" withBackButton />
        <BlockContainer>
            <ApprovedCompaniesFiltersContainer />
        </BlockContainer>

        <ApprovedCompaniesListContainer />
    </>
);

export default ApprovedCompanies;
