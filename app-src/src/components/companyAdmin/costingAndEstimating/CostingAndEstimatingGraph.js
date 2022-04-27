import { formatCurrency } from 'helpers/generic';
import moment from 'moment';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import BlockContainer from '../../shared/generic/block/containers/BlockContainer';
import useCostingAndEstimatingGraph from './_hooks/useCostingAndEstimatingGraph';
import DateRangePicker from '../../shared/generic/form/presentational/DateRangePicker';

const CostingAndEstimatingGraph = ({ graph, filterFormData, onChange }) => {
    const { data, options } = useCostingAndEstimatingGraph(graph);
    const { dateRange } = filterFormData;

    return (
        <div className="graph-wrapper">
            <BlockContainer contentClass="border">
                <h3>Graph</h3>

                <DateRangePicker name="dateRange" value={dateRange} onChange={onChange} />
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
