import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import FloorDetails from './FloorDetails';

const FloorStats = ({ floor, stats }) => (
    <div className="stats size-lg-12">
        <h3 className="heading heading-3 size-lg-6">Details</h3>
        <h4 className="heading heading-3 size-lg-6">Latest Pin Histories</h4>
        <FloorDetails floor={floor} />
        <PieChart stats={stats} hierarchyType="floor" />
    </div>
);

export default FloorStats;
