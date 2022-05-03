import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import React from 'react';

const CostingCartPrelimSummaryItem = ({ prelim, showEditCustomPrelimModal }) => {
    const { prelimName, markup, cost } = prelim;
    console.log(prelim);

    return (
        <FlexWrapper direction="row" justify="between" align="center" width="12">
            <span>{prelimName}</span>
            <FlexWrapper direction="row" justify="end" align="center" width="3">
                <span>{cost ? `£${formatCurrency(cost)}` : `${markup}%`}</span>
                <ActionMenu>
                    <ActionMenuActionButton
                        text="Edit"
                        onClick={() => showEditCustomPrelimModal(prelim)}
                    />
                    <ActionMenuActionButton text="Delete" onClick={() => {}} isNegative />
                </ActionMenu>
            </FlexWrapper>
        </FlexWrapper>
    );
};

export default CostingCartPrelimSummaryItem;
