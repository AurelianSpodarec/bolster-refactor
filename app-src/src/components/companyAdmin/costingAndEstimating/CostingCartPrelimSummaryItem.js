import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import React from 'react';

const CostingCartPrelimSummaryItem = ({ prelim }) => {
    const { name, markup, cost } = prelim;

    return (
        <FlexWrapper direction="row" justify="between" align="center">
            <span>{name}</span>
            <span>{cost ? `£${formatCurrency(cost)}` : `${markup}%`}</span>
        </FlexWrapper>
    );
};

export default CostingCartPrelimSummaryItem;
