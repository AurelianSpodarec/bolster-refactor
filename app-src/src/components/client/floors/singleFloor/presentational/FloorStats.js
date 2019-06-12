import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import FloorDetails from './FloorDetails';

const FloorStats = ({ floor, stats }) => (
    <div className="stats client-stats size-lg-12">
        <FloorDetails stats={stats} floor={floor} />
        <PieChart
            stats={stats}
            hierarchyType="floor"
            sizeClasses="size-lg-12"
        />
    </div>
);

export default FloorStats;

// const FloorStats = ({ floor, stats }) => (
//     <div className="stats size-lg-12">
//         <PieChart stats={stats} hierarchyType="floor" />
//         <FloorDetails stats={stats} floor={floor} />
//     </div>
// );
