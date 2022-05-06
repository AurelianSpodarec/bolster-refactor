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
    const fetchError = null;
    const isFetching = false;
    const { data, options, graphRef } = useDashboardLineGraph(graph);

    console.log(graph);

    return (
        <Block containerClass="flex-row-item size-lg-6 size-md-12">
            <BlockHeading title="Costing Totals" />
            <BlockContainer
                isFetching={isFetching}
                error={fetchError}
                isEmpty={isEmpty(graph.datasets) || isEmpty(graph.labels)}
                containerClass="size-lg-12"
                noWhiteBackground
            >
                <div ref={graphRef}>
                    <Line data={data} options={options} />
                </div>
            </BlockContainer>
        </Block>
    );
};

export default DashboardLineGraph;
