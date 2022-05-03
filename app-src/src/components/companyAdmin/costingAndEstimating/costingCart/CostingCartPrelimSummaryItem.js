import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import React from 'react';

const CostingCartPrelimSummaryItem = ({ prelim }) => {
    const { name, markup, cost } = prelim;

    return (
        <FlexWrapper direction="row" justify="between" align="center" width="12">
            <span>{name}</span>
            <FlexWrapper direction="row" justify="end" align="center" width="3">
                <span>{cost ? `£${formatCurrency(cost)}` : `${markup}%`}</span>
                <ActionMenu>
                    <ActionMenuActionButton text="Edit" onClick={() => {}} />
                    <ActionMenuActionButton text="Delete" onClick={() => {}} isNegative />
                </ActionMenu>
            </FlexWrapper>
        </FlexWrapper>
    );
};

export default CostingCartPrelimSummaryItem;
