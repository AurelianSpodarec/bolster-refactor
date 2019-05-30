import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import ApprovedCompaniesListContainer from '../containers/ApprovedCompaniesListContainer';

const ApprovedCompanies = () => (
    <>
        <PageHeading title="Bolster Approved Companies" withBackButton />
        <ApprovedCompaniesListContainer />
    </>
);

export default ApprovedCompanies;
