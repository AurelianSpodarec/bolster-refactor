import React from 'react';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import useCostingAndEstimatingPrelimsSetActions from '../_hooks/useCostingAndEstimatingPrelimsSetActions';
import { useSelector } from 'react-redux';
import { selectCompanyCurrency } from '../../../../selectors/companyAdmin/companySettings';
import { CURRENCY_SYMBOLS } from '../../../../constants/companyAdmin/enums';

const CostingCartPrelimSummaryItem = ({ prelim }) => {
    const { prelimName, cost, isCustom } = prelim;
    const { showEditCustomPrelimModal, showRemovePrelimModal } =
        useCostingAndEstimatingPrelimsSetActions();

    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];

    return (
        <FlexWrapper direction="row" justify="between" align="center" width="12">
            <span>{prelimName}</span>
            <FlexWrapper direction="row" justify="end" align="center" width="4">
                <span>{`${cost < 0 ? '-' : ''}${currencySymbol}${formatCurrency(
                    cost,
                    false,
                )}`}</span>
                <ActionMenu>
                    {isCustom && (
                        <ActionMenuActionButton
                            text="Edit"
                            onClick={() => {
                                showEditCustomPrelimModal(prelim);
                            }}
                        />
                    )}

                    <ActionMenuActionButton
                        text="Remove"
                        onClick={() => showRemovePrelimModal(prelim)}
                        isNegative
                    />
                </ActionMenu>
            </FlexWrapper>
        </FlexWrapper>
    );
};

export default CostingCartPrelimSummaryItem;
