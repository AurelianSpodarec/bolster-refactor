import React from 'react';

import { isEmpty } from 'helpers/generic';
import { Line } from 'react-chartjs-2';
import BlockContainer from '../../../shared/generic/block/containers/BlockContainer';
import useDashboardLineGraph from '../_hooks/useDashboardLineGraph';
import { dummyLineGraphData } from './dummyGraphData';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DashboardLineGraph = () => {
    const graph = dummyLineGraphData;
    const { data, options, graphRef } = useDashboardLineGraph(graph);

    console.log(graph.dataSets[0].data);

    return (
        <div ref={graphRef}>
            <Line data={data} options={options} />
        </div>
    );
};

export default DashboardLineGraph;
