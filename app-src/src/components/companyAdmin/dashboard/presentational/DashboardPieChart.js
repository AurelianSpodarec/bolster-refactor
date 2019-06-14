import React from 'react';
import PieChart from 'components/shared/stats/presentational/PieChart';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DashboardPieChart = ({ stats }) => (
    <>
        <BlockHeading title="All Pin Histories" />
        <div className="size-lg-12 stats dashbaord">
            <PieChart
                stats={stats}
                sizeClasses="size-lg-12"
                hierarchyType="Company"
                wTitle={false}
            />
        </div>
    </>
);

export default DashboardPieChart;
