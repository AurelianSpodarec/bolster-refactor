import Error from 'components/shared/generic/misc/presentational/Error';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { formatCurrency } from 'helpers/generic';
import React from 'react';
import BlockContainer from '../../../shared/generic/block/containers/BlockContainer';
import CartReportButton from './CartReportButton';
import CostingCartPinSummary from './CostingCartPinSummary';
import CostingCartPrelimSummary from './CostingCartPrelimSummary';

const CostingCart = ({ data, isFetching, fetchError }) => {
    // const { buildingCosts, prePrelimCost, prelimIDs, customPrelims, prelimTotal, cartTotal } = data;
    return (
        <div className="costing-cart">
            <BlockContainer contentClass="border" containerClass="fullheight">
                <h2>Costing cart</h2>

                {isFetching && !fetchError && <Loading />}
                {!isFetching && !fetchError && data && (
                    <>
                        <CostingCartPinSummary
                            title="Pin Summary"
                            total={data.prePrelimCost}
                            data={data.buildingCosts}
                        />
                        <CostingCartPrelimSummary
                            title="Prelims"
                            total={data.prelimTotal}
                            prelimIDs={data.prelimIDs}
                            customPrelims={data.customPrelims}
                        />

                        <div className="grand-total">
                            <h3>Total exc VAT:</h3>
                            <h1>{`£${data.cartTotal ? formatCurrency(data.cartTotal) : '-'}`}</h1>
                        </div>

                        <CartReportButton />
                    </>
                )}
                {!isFetching && fetchError && <Error>{fetchError}</Error>}
            </BlockContainer>
        </div>
    );
};

export default CostingCart;
