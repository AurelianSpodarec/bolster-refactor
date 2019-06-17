import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';
import ApprovedCompaniesRoutesContainer from '../containers/ApprovedCompaniesRouteContainer';

const ApprovedCompanies = ({ companies }) => (
    <>
        <PageHeading title="Bolster Approved Companies" withBackButton>
            <TabsContainer classes="no-breadcrumb" />
        </PageHeading>

        <ApprovedCompaniesRoutesContainer companies={companies} />
    </>
);

export default ApprovedCompanies;
