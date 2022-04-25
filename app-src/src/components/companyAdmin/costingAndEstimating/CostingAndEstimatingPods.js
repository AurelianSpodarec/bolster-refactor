import React from 'react';

import FlexWrapper from '../../shared/generic/flexWrapper/FlexWrapper';
import BlockContainer from '../../shared/generic/block/containers/BlockContainer';

const CostingAndEstimatingPods = () => {
    return (
        <FlexWrapper>
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
        </FlexWrapper>
    );
};

export default CostingAndEstimatingPods;
