import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import React, { useState } from 'react';

const CostingCartPinSummaryItem = ({ building }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { buildingID, cost, drawings } = building;

    return (
        <div className="summary-item">
            <FlexWrapper
                direction="row"
                justify="between"
                align="center"
                extraClasses="summary-row sub-item"
            >
                <h5>{`### Building ID ${buildingID} ###`}</h5>
                <div>
                    <AccordionButton
                        active={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </div>
            </FlexWrapper>
            <div className={`expandable ${isExpanded ? 'active' : ''}`}>
                {drawings.map((drawing, i) => (
                    <FlexWrapper
                        key={i}
                        direction="row"
                        justify="between"
                        align="center"
                        extraClasses="sub-item"
                    >
                        <span>{`### Drawing ID ${drawing.drawingID} ###`}</span>
                        <span>{`£${formatCurrency(drawing.cost)}`}</span>
                    </FlexWrapper>
                ))}
            </div>
            <div className="divider" />
            <div className="total">
                <h5>{`£${formatCurrency(cost)}`}</h5>
            </div>
        </div>
    );
};

export default CostingCartPinSummaryItem;
