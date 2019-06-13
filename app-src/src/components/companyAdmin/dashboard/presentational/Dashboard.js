import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DashboardPinFeedContainer from '../containers/DashboardPinFeedContainer';
import DashboardStatsContainer from '../containers/DashboardStatsContainer';
import DashboardStatsFiltersContainer from '../containers/DashboardStatsFiltersContainer';

const Dashboard = () => (
    <>
        <PageHeading title="Dashboard" />
        <DashboardStatsFiltersContainer />
        <DashboardStatsContainer />
        <DashboardPinFeedContainer />
    </>
);

export default Dashboard;
