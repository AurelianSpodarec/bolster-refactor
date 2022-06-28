import React from 'react';
import { useSelector } from 'react-redux';

import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import useCostingAndEstimatingPrelimsSetActions from '../_hooks/useCostingAndEstimatingPrelimsSetActions';
import { selectCompanyCurrency } from '../../../../selectors/companyAdmin/companySettings';
import { CURRENCY_SYMBOLS } from '../../../../constants/companyAdmin/enums';
import useInheritedFrom from '../_hooks/useInheritedFrom';

const CostingCartPrelimSummaryItem = ({ prelim }) => {
    const { prelimName, cost, isCustom, isInherited } = prelim;
    const { showEditCustomPrelimModal, showRemovePrelimModal } =
        useCostingAndEstimatingPrelimsSetActions();

    const { inheritedFrom } = useInheritedFrom(prelim);

    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];

    return (
        <FlexWrapper direction="row" justify="between" align="center" width="12">
            <span>
                {isInherited ? `${prelimName} (Inherited from ${inheritedFrom?.name})` : prelimName}
            </span>
            <FlexWrapper direction="row" justify="end" align="center" width="4">
                <span>{`${cost < 0 ? '-' : ''}${currencySymbol}${formatCurrency(
                    cost,
                    false,
                )}`}</span>
                <ActionMenu disabled={isInherited}>
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
