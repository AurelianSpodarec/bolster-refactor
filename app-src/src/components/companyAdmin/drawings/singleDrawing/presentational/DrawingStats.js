import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import DrawingDetails from './DrawingDetails';

const DrawingStats = ({ drawing, stats, onMobile, isFiltered = false }) => (
    <div className="stats drawing-stats size-lg-12">
        <PieChart
            sizeClasses="size-lg-12"
            stats={stats}
            hierarchyType="drawing"
            onMobile={onMobile}
            isFiltered={isFiltered}
        />
        <DrawingDetails stats={stats} drawing={drawing} />
    </div>
);

export default DrawingStats;
