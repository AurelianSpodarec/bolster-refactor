import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React from 'react';

const Wages = () => {
    return (
        <div className="width-12 wages-body">
            <BlockContainer className="content-container size-lg-5">
                <div>COL1</div>
            </BlockContainer>
            <BlockContainer className="content-container size-lg-5">
                <div>COL2</div>
            </BlockContainer>
        </div>
    );
};

export default Wages;
