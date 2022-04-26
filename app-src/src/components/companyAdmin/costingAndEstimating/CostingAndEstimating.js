import React from 'react';

import GridWrapper from '../../shared/generic/gridWrapper/GridWrapper';

import CostingAndEstimatingPods from './CostingAndEstimatingPods';
import BlockContainer from '../../shared/generic/block/containers/BlockContainer';
import CostingCart from './CostingCart';
import useCostingAndEstimating from './_hooks/useCostingAndEstimating';

const CostingAndEstimating = () => {
    const { costingCart, graph, keyStatistics, allPins } = useCostingAndEstimating();
    return (
        <GridWrapper gap={30} containerClass="costing-wrapper">
            <CostingAndEstimatingPods data={keyStatistics} />

            <CostingCart data={costingCart} />

            <div className="graph-wrapper">
                <BlockContainer contentClass="border">
                    <h3>Graph</h3>
                </BlockContainer>
            </div>

            <div className="filters-wrapper">
                <BlockContainer contentClass="border">
                    <h3>Filters</h3>
                </BlockContainer>
            </div>
        </GridWrapper>
    );
};

export default CostingAndEstimating;
