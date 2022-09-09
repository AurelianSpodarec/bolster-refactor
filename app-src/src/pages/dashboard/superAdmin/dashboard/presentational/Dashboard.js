import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CompanyReportsTableContainer from 'pages/dashboard/superAdmin/companyReports/containers/CompanyReportsTableContainer';

const Dashboard = () => (
    <>
        <PageHeading title="Dashboard" />
        <CompanyReportsTableContainer />
    </>
);

export default Dashboard;
