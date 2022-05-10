import React from 'react';

import { Line } from 'react-chartjs-2';
import useDashboardLineGraph from '../_hooks/useDashboardLineGraph';
import { dummyLineGraphData } from './dummyGraphData';

const DashboardLineGraph = () => {
    const graph = dummyLineGraphData;
    const { data, options, graphRef } = useDashboardLineGraph(graph);

    return (
        <div ref={graphRef}>
            <Line data={data} options={options} />
        </div>
    );
};

export default DashboardLineGraph;
