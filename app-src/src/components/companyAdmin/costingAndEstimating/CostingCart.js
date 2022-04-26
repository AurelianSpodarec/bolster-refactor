import React from 'react';
import BlockContainer from '../../shared/generic/block/containers/BlockContainer';
import CostingCartSummaryItem from './CostingCartSummaryItem';

const CostingCart = () => {
    return (
        <div className="costing-cart">
            <BlockContainer>
                <h2>Costing cart</h2>

                <CostingCartSummaryItem />

                <div className="grand-total">
                    <h3>Total exc VAT:</h3>
                    <h1>£22,306.78</h1>
                </div>
            </BlockContainer>
        </div>
    );
};

export default CostingCart;
