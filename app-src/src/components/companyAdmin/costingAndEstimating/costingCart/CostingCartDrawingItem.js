import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import { selectDrawing } from 'selectors/companyAdmin/drawings';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';

const CostingCartDrawingItem = ({ drawing }) => {
    const dispatch = useDispatch();
    const { drawingID, cost } = drawing;
    const specificDrawing = useSelector(state => selectDrawing(state, drawingID));

    useEffect(() => {
        dispatch(fetchSingleDrawing(drawingID));
    }, []);

    return (
        <FlexWrapper direction="row" justify="between" align="center" extraClasses="sub-item">
            <span>{specificDrawing?.name}</span>
            <span>{`£${!Number.isNaN(cost) ? formatCurrency(cost) : '0.00'}`}</span>
        </FlexWrapper>
    );
};

export default CostingCartDrawingItem;
