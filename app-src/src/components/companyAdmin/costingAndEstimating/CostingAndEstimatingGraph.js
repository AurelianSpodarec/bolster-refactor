import { formatCurrency } from 'helpers/generic';
import moment from 'moment';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import BlockContainer from '../../shared/generic/block/containers/BlockContainer';
import useCostingAndEstimatingGraph from './_hooks/useCostingAndEstimatingGraph';
import DateRangePicker from '../../shared/generic/form/presentational/DateRangePicker';
import FlexWrapper from '../../shared/generic/flexWrapper/FlexWrapper';

const CostingAndEstimatingGraph = ({ graph, filterFormData, onChange }) => {
    const { data, options } = useCostingAndEstimatingGraph(graph);
    const { dateRange } = filterFormData;
    console.log(dateRange);
    return (
        <div className="graph-wrapper">
            <BlockContainer contentClass="border">
                <FlexWrapper extraClasses="graph-filters">
                    <FlexWrapper align="center" justify="between" width={4}>
                        <div className="date-period-buttons">
                            <button>
                                <i className="far fa-chevron-left" />
                            </button>
                            <button>
                                <i className="far fa-chevron-right" />
                            </button>
                        </div>

                        <p>last 7 days</p>

                        <div className="calendar-select border">
                            <DateRangePicker
                                name="dateRange"
                                value={dateRange}
                                onChange={onChange}
                                text="Calendar"
                            />
                        </div>
                    </FlexWrapper>

                    <FlexWrapper align="center" justify="end" width={8}>
                        <p>Filter</p>
                    </FlexWrapper>
                </FlexWrapper>

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
