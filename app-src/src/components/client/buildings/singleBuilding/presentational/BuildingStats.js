import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import BuildingDetails from './BuildingDetails';

const BuildingStats = ({ building, stats }) => (
    <div className="stats client-stats size-lg-12">
        <div className="size-lg-12">
            <BuildingDetails stats={stats} building={building} />
            <PieChart
                stats={stats}
                hierarchyType="building"
                sizeClasses="size-lg-12"
            />
        </div>
    </div>
);

export default BuildingStats;
