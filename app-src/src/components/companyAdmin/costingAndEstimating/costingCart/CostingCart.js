import Error from 'components/shared/generic/misc/presentational/Error';
import { costingAndEstimatingType } from 'constants/companyAdmin/enums';
import { formatCurrency } from 'helpers/generic';
import React from 'react';
import BlockContainer from '../../../shared/generic/block/containers/BlockContainer';
import LoadingOverlay from '../LoadingOverlay';
import CartReportButton from './CartReportButton';
import CostingCartPinSummary from './CostingCartPinSummary';
import CostingCartPrelimSummary from './CostingCartPrelimSummary';

const CostingCart = ({ data, isFetching, fetchError, selectedTab }) => {
    const selectedTabType = costingAndEstimatingType[selectedTab.toUpperCase()];
    const title = `${
        selectedTabType === costingAndEstimatingType.COSTING ? 'Costing' : 'Estimating'
    } Cart`;

    return (
        <div className="costing-cart">
            <BlockContainer contentClass="border" containerClass="fullheight">
                <h2>{title}</h2>

                {!fetchError && data && (
                    <>
                        <CostingCartPinSummary
                            title="Pin Summary"
                            total={data.prePrelimCost}
                            data={data.buildingCosts}
                        />
                        <CostingCartPrelimSummary
                            title="Prelims"
                            total={data.prelimTotal}
                            prelims={data.prelims}
                        />

                        <div className="grand-total">
                            <h3>Total exc VAT:</h3>
                            <h1>{`£${
                                data.cartTotal ? formatCurrency(data.cartTotal) : formatCurrency(0)
                            }`}</h1>
                        </div>

                        <CartReportButton />
                    </>
                )}
                {!isFetching && fetchError && <Error>{fetchError}</Error>}
                {isFetching && !fetchError && <LoadingOverlay />}
            </BlockContainer>
        </div>
    );
};

export default CostingCart;
