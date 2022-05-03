import { formatCurrency } from 'helpers/generic';
import React from 'react';
import BlockContainer from '../../../shared/generic/block/containers/BlockContainer';
import CartReportButton from './CartReportButton';
import CostingCartPinSummary from './CostingCartPinSummary';
import CostingCartPrelimSummary from './CostingCartPrelimSummary';

const CostingCart = ({ data }) => {
    const { buildingCosts, prePrelimCost, prelimIDs, customPrelims, prelimTotal, cartTotal } = data;
    return (
        <div className="costing-cart">
            <BlockContainer contentClass="border" containerClass="fullheight">
                <h2>Costing cart</h2>

                <CostingCartPinSummary
                    title="Pin Summary"
                    total={prePrelimCost}
                    data={buildingCosts}
                />
                <CostingCartPrelimSummary
                    title="Prelims"
                    total={prelimTotal}
                    prelimIDs={prelimIDs}
                    customPrelims={customPrelims}
                />

                <div className="grand-total">
                    <h3>Total exc VAT:</h3>
                    <h1>{`£${formatCurrency(cartTotal)}`}</h1>
                </div>

                <CartReportButton />
            </BlockContainer>
        </div>
    );
};

export default CostingCart;
