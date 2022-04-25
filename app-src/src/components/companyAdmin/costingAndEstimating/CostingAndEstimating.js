import React from 'react';

import GridWrapper from '../../shared/generic/gridWrapper/GridWrapper';

import CostingAndEstimatingPods from './CostingAndEstimatingPods';
import BlockContainer from '../../shared/generic/block/containers/BlockContainer';

const CostingAndEstimating = () => {
    return (
        <GridWrapper gap={30} containerClass="costing-wrapper">
            <CostingAndEstimatingPods />

            <div className="costing-cart">
                <BlockContainer>
                    <p>Costing cart</p>
                </BlockContainer>
            </div>

            <div className="graph-wrapper">
                <BlockContainer>
                    <p>Graph</p>
                </BlockContainer>
            </div>

            <div className="filters-wrapper">
                <BlockContainer>
                    <p>Filters wrapper</p>
                </BlockContainer>
            </div>
        </GridWrapper>
    );
};

export default CostingAndEstimating;
