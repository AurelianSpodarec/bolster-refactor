import React from 'react';

import GridWrapper from '../../shared/generic/gridWrapper/GridWrapper';

import CostingAndEstimatingPods from './pods/CostingAndEstimatingPods';
import BlockContainer from '../../shared/generic/block/containers/BlockContainer';
import CostingCart from './costingCart/CostingCart';
import useCostingAndEstimating from './_hooks/useCostingAndEstimating';
import useCostingAndEstimatingFilters from './_hooks/useCostingAndEstimatingFilters';
import CostingAndEstimatingGraph from './CostingAndEstimatingGraph';

const CostingAndEstimating = () => {
    const { costingCart, graph, keyStatistics, allPins } = useCostingAndEstimating();
    const { filterFormData, onChange } = useCostingAndEstimatingFilters();

    return (
        <GridWrapper gap={30} containerClass="costing-wrapper">
            <CostingAndEstimatingPods data={keyStatistics} />

            <CostingCart data={costingCart} />

            <CostingAndEstimatingGraph
                graph={graph}
                filterFormData={filterFormData}
                onChange={onChange}
            />

            <div className="filters-wrapper">
                <BlockContainer contentClass="border">
                    <h3>Filters</h3>
                </BlockContainer>
            </div>
        </GridWrapper>
    );
};

export default CostingAndEstimating;
