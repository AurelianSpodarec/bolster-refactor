import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DashboardPinFeedContainer from '../containers/DashboardPinFeedContainer';

const Dashboard = () => (
    <>
        <PageHeading title="Dashboard" />
        <DashboardPinFeedContainer />
    </>
);

export default Dashboard;
