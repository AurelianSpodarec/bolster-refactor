import { formatCurrency } from 'helpers/generic';
import moment from 'moment';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import BlockContainer from '../../shared/generic/block/containers/BlockContainer';
import useCostingAndEstimatingGraph from './_hooks/useCostingAndEstimatingGraph';
import DateRangePicker from '../../shared/generic/form/presentational/DateRangePicker';

const CostingAndEstimatingGraph = ({ graph }) => {
    const { data, options } = useCostingAndEstimatingGraph(graph);

    const [dateRange, setDateRange] = useState({
        startDate: moment().subtract(7, 'days').toDate(),
        endDate: moment().toDate(),
    });

    const _onChange = (name, value) => {
        setDateRange(value);
    };

    return (
        <div className="graph-wrapper">
            <BlockContainer contentClass="border">
                <h3>Graph</h3>

                <DateRangePicker name="daterange" value={dateRange} onChange={_onChange} />
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
