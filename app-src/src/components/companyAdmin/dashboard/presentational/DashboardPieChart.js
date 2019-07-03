import React from 'react';
import PieChart from 'components/shared/stats/presentational/PieChart';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DashboardPieChart = ({ stats, onMobile }) => (
    <>
        <BlockHeading title="All Pin Histories" />
        <div className="size-lg-12 stats dashboard">
            <PieChart
                stats={stats}
                sizeClasses="size-lg-12"
                hierarchyType="Company"
                wTitle={false}
                onMobile={onMobile}
            />
        </div>
    </>
);

export default DashboardPieChart;
