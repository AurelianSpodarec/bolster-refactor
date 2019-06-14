import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DashboardPinFeedContainer from '../containers/DashboardPinFeedContainer';
import DashboardStatsFiltersContainer from '../containers/DashboardStatsFiltersContainer';
import DashboardPieChartContainer from '../containers/DashboardPieChartContainer';
import DashboardBarChartContainer from '../containers/DashboardBarChartContainer';

const Dashboard = () => (
    <>
        <PageHeading title="Dashboard" />
        <DashboardStatsFiltersContainer />
        <div className="size-lg-12">
            <DashboardBarChartContainer />
        </div>

        <div className="size-lg-12">
            <DashboardPieChartContainer />
            <DashboardPinFeedContainer />
        </div>
    </>
);

export default Dashboard;
