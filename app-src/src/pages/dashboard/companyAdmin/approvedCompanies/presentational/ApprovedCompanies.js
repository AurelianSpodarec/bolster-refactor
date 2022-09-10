import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import TabsContainer from 'components_DEPRECATED/shared/generic/tabs/containers/TabsContainer';
import ApprovedCompaniesRoutesContainer from '../containers/ApprovedCompaniesRouteContainer';

const ApprovedCompanies = ({ companies }) => (
    <>
        <PageHeading title="Bolster Approved Companies">
            <TabsContainer classes="no-breadcrumb" />
        </PageHeading>

        <ApprovedCompaniesRoutesContainer companies={companies} />
    </>
);

export default ApprovedCompanies;
