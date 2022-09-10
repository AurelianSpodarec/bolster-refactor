import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import { selectDrawing } from 'selectors/companyAdmin/drawings';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import { selectCompanyCurrency } from '../../../../../selectors/companyAdmin/companySettings';
import { CURRENCY_SYMBOLS } from '../../../../../constants/companyAdmin/enums';

const CostingCartDrawingItem = ({ drawing }) => {
    const dispatch = useDispatch();
    const { drawingID, cost } = drawing;
    const specificDrawing = useSelector(state => selectDrawing(state, drawingID));
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
    useEffect(() => {
        dispatch(fetchSingleDrawing(drawingID));
    }, []);

    return (
        <FlexWrapper direction="row" justify="between" align="center" extraClasses="sub-item">
            <span className="body-text">{specificDrawing?.name}</span>
            <span className="body-text">{`${cost < 0 ? '-' : ''}${currencySymbol}${
                !Number.isNaN(cost) ? formatCurrency(cost, false) : '0.00'
            }`}</span>
        </FlexWrapper>
    );
};

export default CostingCartDrawingItem;
