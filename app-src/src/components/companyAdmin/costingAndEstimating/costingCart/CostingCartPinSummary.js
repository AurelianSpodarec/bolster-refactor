import React, { useState } from 'react';
import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import CostingCartPinSummaryItem from './CostingCartPinSummaryItem';

const CostingCartPinSummary = ({ title, total, data = [] }) => {
    const [isExpanded, setIsExpanded] = useState(false);

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
                {data.map((building, i) => (
                    <CostingCartPinSummaryItem key={i} building={building} />
                ))}
                <div className="divider" />
            </div>
            <div className="total">
                <h3>{`£${total ? formatCurrency(total) : '0.00'}`}</h3>
            </div>
            <div className="divider" />
        </div>
    );
};

export default CostingCartPinSummary;
