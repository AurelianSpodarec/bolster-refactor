import { formatCurrency } from 'helpers/generic';
import React from 'react';
import { Line } from 'react-chartjs-2';
import BlockContainer from '../../shared/generic/block/containers/BlockContainer';
import useCostingAndEstimatingGraph from './_hooks/useCostingAndEstimatingGraph';

const CostingAndEstimatingGraph = ({ graph }) => {
    const { data, options } = useCostingAndEstimatingGraph(graph);

    return (
        <div className="graph-wrapper">
            <BlockContainer contentClass="border">
                <h3>Graph</h3>
                <Line data={data} options={options} />
                <div className="graph-total">
                    <h3>Total:</h3>
                    <h1>{`£${formatCurrency(graph.total)}`}</h1>
                </div>
            </BlockContainer>
        </div>
    );
};

export default CostingAndEstimatingGraph;
