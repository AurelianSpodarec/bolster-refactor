import React from 'react';

import BlockContainer from '../../shared/generic/block/containers/BlockContainer';

const CostingAndEstimatingPods = () => {
    return (
        <div className="pods">
            <BlockContainer contentClass="background-gradient">
                <h3 className="heading heading-3">Highest Earning employee</h3>
            </BlockContainer>
            <BlockContainer contentClass="background-gradient">
                <h3 className="heading heading-3">Highest Earning Building</h3>
            </BlockContainer>
            <BlockContainer contentClass="background-gradient">
                <h3 className="heading heading-3">Avg Pin Price</h3>
            </BlockContainer>
            <BlockContainer contentClass="background-gradient">
                <h3 className="heading heading-3">Most Used Installation Type</h3>
            </BlockContainer>
        </div>
    );
};

export default CostingAndEstimatingPods;
