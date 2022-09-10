import React, { useState } from 'react';

import useCostingAndEstimatingGraph from '../_hooks/useCostingAndEstimatingGraph';

import { formatCurrency } from 'helpers/generic';
import { Line } from 'react-chartjs-2';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import DateRangePicker from 'components_DEPRECATED/shared/generic/form/presentational/DateRangePicker';
import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';
import CostingGraphFilters from './CostingGraphFilters';
import Error from 'components_DEPRECATED/shared/generic/misc/presentational/Error';
import LoadingOverlay from '../LoadingOverlay';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import { useSelector } from 'react-redux';
import { selectCompanyCurrency } from '../../../../../selectors/companyAdmin/companySettings';
import { CURRENCY_SYMBOLS } from '../../../../../constants/companyAdmin/enums';

const CostingAndEstimatingGraph = ({
    graph,
    filterFormData,
    filters,
    onChange,
    onThisWeek,
    onPrevWeek,
    onNextWeek,
    isFetching,
    fetchError,
}) => {
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
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

                                <ActionButton
                                    onClick={onThisWeek}
                                    text="Last 7 Days"
                                    extraClasses="transparent"
                                />

                                <div className="calendar-select border">
                                    <DateRangePicker
                                        name="dateRange"
                                        value={dateRange}
                                        onChange={onChange}
                                        text="Calendar"
                                        hideStaticRanges={true}
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
                                        filters={filters}
                                        onChange={onChange}
                                        closeFilters={() => setShowFilterOptions(false)}
                                    />
                                )}
                            </FlexWrapper>
                        </FlexWrapper>

                        <Line data={data} options={options} />
                        <div className="graph-total">
                            <h3>Total:</h3>
                            <h1>{`${graph?.total < 0 ? '-' : ''}${currencySymbol}${
                                graph?.total !== 0 ? formatCurrency(graph?.total, false) : '0.00'
                            }`}</h1>
                        </div>
                    </>
                )}
                {!isFetching && fetchError && <Error>{fetchError}</Error>}
                {isFetching && !fetchError && <LoadingOverlay />}
            </BlockContainer>
        </div>
    );
};

export default CostingAndEstimatingGraph;
