import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';
import CompanyAdminsRoutes from './CompanyAdminsRoutes';

const AllCompanyAdmins = () => (
    <>
        <PageHeading title="All Admins" withBackButton>
            <TabsContainer classes="no-breadcrumb" />
        </PageHeading>
        <CompanyAdminsRoutes />
    </>
);

export default AllCompanyAdmins;
