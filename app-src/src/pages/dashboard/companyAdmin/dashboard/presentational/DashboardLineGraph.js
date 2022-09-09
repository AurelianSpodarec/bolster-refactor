import React from 'react';

import { Line } from 'react-chartjs-2';
import useDashboardLineGraph from '../_hooks/useDashboardLineGraph';

const DashboardLineGraph = ({ costEstGraph }) => {
    const { data, options, graphRef } = useDashboardLineGraph(costEstGraph);

    return (
        <div ref={graphRef}>
            <Line data={data} options={options} />
        </div>
    );
};

export default DashboardLineGraph;
