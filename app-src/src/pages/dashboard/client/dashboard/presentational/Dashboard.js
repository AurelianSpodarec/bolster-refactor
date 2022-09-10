import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import DashboardPinFeedContainer from '../containers/DashboardPinFeedContainer';
import DashboardStatsContainer from '../containers/DashboardStatsContainer';

const Dashboard = () => (
    <>
        <PageHeading title="Dashboard" />
        <DashboardStatsContainer />
        <DashboardPinFeedContainer />
    </>
);

export default Dashboard;
