import React, { useState } from 'react';

import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import CostingCartPrelimSummaryItem from './CostingCartPrelimSummaryItem';
import { dummyPrelims } from '../dummyData';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import useCostingAndEstimatingPrelimsSetActions from '../_hooks/useCostingAndEstimatingPrelimsSetActions';

const CostingCartPrelimSummary = ({ title, total, prelims = [], customPrelims = [] }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const dataToShow = [...prelims.map(id => dummyPrelims[id]), ...customPrelims];

    const { showExistingPrelimModal, showAddCustomPrelimModal, showEditCustomPrelimModal } =
        useCostingAndEstimatingPrelimsSetActions();

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
            <div className={`expandable ${isExpanded ? 'active' : ''}`}>
                {dataToShow.map((prelim, i) => (
                    <CostingCartPrelimSummaryItem
                        showEditCustomPrelimModal={showEditCustomPrelimModal}
                        key={i}
                        prelim={prelim}
                    />
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
                <h3>{`£${total ? formatCurrency(total) : formatCurrency(0)}`}</h3>
            </div>
            <div className="divider" />
        </div>
    );
};

export default CostingCartPrelimSummary;
