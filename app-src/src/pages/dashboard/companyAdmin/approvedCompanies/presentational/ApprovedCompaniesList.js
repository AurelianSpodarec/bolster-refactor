import React from 'react';

import ApprovedCompaniesListContainer from '../containers/ApprovedCompaniesListContainer';

import ApprovedCompaniesFiltersContainer from '../containers/ApprovedCompaniesFiltersContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';

const ApprovedCompaniesList = () => (
    <>
        <BlockContainer>
            <ApprovedCompaniesFiltersContainer />
        </BlockContainer>

        <ApprovedCompaniesListContainer />
    </>
);

export default ApprovedCompaniesList;
