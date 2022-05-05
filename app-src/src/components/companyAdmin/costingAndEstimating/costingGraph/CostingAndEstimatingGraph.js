import React, { useState } from 'react';

import useCostingAndEstimatingGraph from '../_hooks/useCostingAndEstimatingGraph';

import { formatCurrency } from 'helpers/generic';
import { Line } from 'react-chartjs-2';
import BlockContainer from '../../../shared/generic/block/containers/BlockContainer';
import DateRangePicker from '../../../shared/generic/form/presentational/DateRangePicker';
import FlexWrapper from '../../../shared/generic/flexWrapper/FlexWrapper';
import CostingGraphFilters from './CostingGraphFilters';
import ButtonContainer from '../../../shared/generic/button/containers/ButtonContainer';
import Error from 'components/shared/generic/misc/presentational/Error';
import LoadingOverlay from '../LoadingOverlay';

const CostingAndEstimatingGraph = ({
    graph,
    filterFormData,
    onChange,
    onThisWeek,
    onPrevWeek,
    onNextWeek,
    isFetching,
    fetchError,
}) => {
    const [
        showFilterOptions,
        // setShowFilterOptions
    ] = useState(false);

    const { data, options, graphRef } = useCostingAndEstimatingGraph(graph);
    const { dateRange } = filterFormData;

    return (
        <div className="graph-wrapper" ref={graphRef}>
            <BlockContainer contentClass="border">
                {!fetchError && (
                    <>
                        <FlexWrapper extraClasses="graph-filters">
                            <FlexWrapper align="center" justify="between" width={4}>
                                <div className="date-period-buttons">
                                    <button onClick={onPrevWeek}>
                                        <i className="far fa-chevron-left" />
                                    </button>
                                    <button onClick={onNextWeek}>
                                        <i className="far fa-chevron-right" />
                                    </button>
                                </div>

                                <ButtonContainer setColour="transparent" handleClick={onThisWeek}>
                                    Last 7 Days
                                </ButtonContainer>

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
                                <ActionButton
                                    icon="filter"
                                    text="Filter"
                                    iconRight
                                    source="secondary"
                                    ambient="positive"
                                    onClick={() => setShowFilterOptions(!showFilterOptions)}
                                />

                                {showFilterOptions && (
                                    <CostingGraphFilters
                                        filterFormData={filterFormData}
                                        onChange={onChange}
                                    />
                                )}
                            </FlexWrapper>
                        </FlexWrapper>

                        <Line data={data} options={options} />
                        {graph?.total && (
                            <div className="graph-total">
                                <h3>Total:</h3>
                                <h1>{`${graph.total < 0 ? '-' : ''}£${formatCurrency(
                                    graph.total,
                                    false,
                                )}`}</h1>
                            </div>
                        )}
                    </>
                )}
                {!isFetching && fetchError && <Error>{fetchError}</Error>}
                {isFetching && !fetchError && <LoadingOverlay />}
            </BlockContainer>
        </div>
    );
};

export default CostingAndEstimatingGraph;
