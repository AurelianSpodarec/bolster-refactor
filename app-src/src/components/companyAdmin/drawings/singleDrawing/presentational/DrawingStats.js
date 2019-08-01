import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import DrawingDetails from './DrawingDetails';
import nograph from '_content/images/no-graph.jpeg';

const DrawingStats = ({ drawing, stats, onMobile, notAvailable = false }) => (
    <div className="stats drawing-stats size-lg-12">
        {notAvailable ? (
            <>
                <h4 className="heading heading-3 size-lg-12">
                    Latest Pin Histories
                </h4>
                <div className="not-available">
                    <p>Requires subscription</p>
                    <img src={nograph} />
                </div>
            </>
        ) : (
            <PieChart
                sizeClasses="size-lg-12"
                stats={stats}
                hierarchyType="drawing"
                onMobile={onMobile}
            />
        )}
        <DrawingDetails stats={stats} drawing={drawing} />
    </div>
);

export default DrawingStats;
