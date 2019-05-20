import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import FloorDetails from './FloorDetails';

const FloorStats = ({ floor, stats }) => (
    <div className="stats size-lg-12">
        <FloorDetails stats={stats} floor={floor} />
        <PieChart stats={stats} hierarchyType="floor" />
    </div>
);

export default FloorStats;

// const FloorStats = ({ floor, stats }) => (
//     <div className="stats size-lg-12">
//         <PieChart stats={stats} hierarchyType="floor" />
//         <FloorDetails stats={stats} floor={floor} />
//     </div>
// );
