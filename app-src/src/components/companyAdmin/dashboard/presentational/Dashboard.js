import React from "react";

import PageHeading from "components/shared/generic/pageHeading/presentational/PageHeading";
import DashboardPinFeedContainer from "../containers/DashboardPinFeedContainer";
import DashboardStatsFiltersContainer from "../containers/DashboardStatsFiltersContainer";
import DashboardPieChartContainer from "../containers/DashboardPieChartContainer";
import DashboardBarChartContainer from "../containers/DashboardBarChartContainer";
import DashboardDataByContainer from "../containers/DashboardDataByContainer";

const Dashboard = ({ isIE10 }) => (
    <>
        <PageHeading title="Dashboard" />
        {isIE10 ? (
            <div className="flex-row size-lg-12">
                <p>Dashboard not available on Internet Explorer 10</p>
            </div>
        ) : (
            <>
                <DashboardStatsFiltersContainer />
                <div className="flex-row size-lg-12">
                    <DashboardBarChartContainer />
                    <DashboardDataByContainer />
                </div>
                <div className="flex-row size-lg-12">
                    <DashboardPieChartContainer />
                    <DashboardPinFeedContainer />
                </div>
            </>
        )}
    </>
);

export default Dashboard;
