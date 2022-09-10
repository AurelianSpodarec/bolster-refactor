import Error from 'components_DEPRECATED/shared/generic/misc/presentational/Error';
import { costingAndEstimatingType, CURRENCY_SYMBOLS } from 'constants/companyAdmin/enums';
import { formatCurrency } from 'helpers/generic';
import React from 'react';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import LoadingOverlay from '../LoadingOverlay';
import CartReportForm from './CartReportForm';
import CostingCartPinSummary from './CostingCartPinSummary';
import CostingCartPrelimSummary from './CostingCartPrelimSummary';
import { useSelector } from 'react-redux';
import { selectCompanyCurrency } from '../../../../../selectors/companyAdmin/companySettings';

const CostingCart = ({ data, isFetching, fetchError, selectedTab, formData, cAndEPostBody }) => {
    const selectedTabType = costingAndEstimatingType[selectedTab.toUpperCase()];
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
    const title = `${
        selectedTabType === costingAndEstimatingType.COSTING ? 'Costing' : 'Estimating'
    } Cart`;

    return (
        <div className="costing-cart">
            <BlockContainer contentClass="border" containerClass="fullheight">
                <h2>{title}</h2>

                {!fetchError && data && (
                    <>
                        <div className="list">
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
                                <h1>{`${data.cartTotal < 0 ? '-' : ''}${currencySymbol}${
                                    data.cartTotal ? formatCurrency(data.cartTotal, false) : '0.00'
                                }`}</h1>
                            </div>
                        </div>
                        <CartReportForm formData={formData} cAndEPostBody={cAndEPostBody} />
                    </>
                )}
                {!isFetching && fetchError && <Error>{fetchError}</Error>}
                {isFetching && !fetchError && <LoadingOverlay />}
            </BlockContainer>
        </div>
    );
};

export default CostingCart;
