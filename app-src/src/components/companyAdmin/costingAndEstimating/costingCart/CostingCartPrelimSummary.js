import React, { useEffect, useState } from 'react';

import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import CostingCartPrelimSummaryItem from './CostingCartPrelimSummaryItem';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import useCostingAndEstimatingPrelimsSetActions from '../_hooks/useCostingAndEstimatingPrelimsSetActions';

const CostingCartPrelimSummary = ({ title, total, prelims = [] }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showOverflow, setShowOverflow] = useState(true);

    const { showExistingPrelimModal, showAddCustomPrelimModal } =
        useCostingAndEstimatingPrelimsSetActions();

    useEffect(() => {
        if (!isExpanded) setShowOverflow(false);
        else setTimeout(() => setShowOverflow(isExpanded), 500);
    }, [isExpanded]);

    return (
        <div className="summary-item">
            <FlexWrapper direction="row" justify="between" align="center">
                <h4>{title}</h4>
                <div>
                    <AccordionButton
                        active={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </div>
            </FlexWrapper>
            <div
                className={`expandable ${isExpanded ? 'active' : ''} ${
                    showOverflow ? 'show-overflow' : ''
                }`}
            >
                {prelims.map((prelim, i) => (
                    <CostingCartPrelimSummaryItem key={i} prelim={prelim} />
                ))}
                <ButtonWrapper alignment="right">
                    <ActionButton
                        extraClasses="margin-top"
                        text="Add existing prelim"
                        onClick={showExistingPrelimModal}
                    />
                    <ActionButton
                        extraClasses="margin-top"
                        text="Create prelim"
                        icon="plus"
                        onClick={showAddCustomPrelimModal}
                    />
                </ButtonWrapper>

                <div className="divider" />
            </div>
            <div className="total">
                <h3>{`${total < 0 ? '-' : ''}£${
                    total ? formatCurrency(total, false) : '0.00'
                }`}</h3>
            </div>
            <div className="divider" />
        </div>
    );
};

export default CostingCartPrelimSummary;
