import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import React, { useState } from 'react';
import CostingCartPrelimSummaryItem from './CostingCartPrelimSummaryItem';
import { dummyPrelims } from '../dummyData';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const CostingCartPrelimSummary = ({ title, total, prelimIDs, customPrelims }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const dataToShow = [...prelimIDs.map(id => dummyPrelims[id]), ...customPrelims];

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
                    <CostingCartPrelimSummaryItem key={i} prelim={prelim} />
                ))}
                <ButtonWrapper alignment="right">
                    <ActionButton
                        extraClasses="margin-top"
                        text="Add New"
                        icon="plus"
                        size="small"
                        onClick={() => {}}
                    />
                </ButtonWrapper>

                <div className="divider" />
            </div>
            <div className="total">
                <h3>{`£${formatCurrency(total)}`}</h3>
            </div>
            <div className="divider" />
        </div>
    );
};

export default CostingCartPrelimSummary;
