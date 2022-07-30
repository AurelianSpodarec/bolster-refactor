import React from 'react';
import PieChart from 'components/shared/stats/presentational/PieChart';

const DashboardPieChart = ({ stats, onMobile }) => (
    <div className="size-lg-12 stats dashboard">
        <PieChart
            stats={stats}
            sizeClasses="size-lg-12"
            hierarchyType="Company"
            wTitle={false}
            onMobile={onMobile}
        />
    </div>
);

export default DashboardPieChart;
