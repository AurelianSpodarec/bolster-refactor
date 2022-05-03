import React, { useState } from 'react';

import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import { formatCurrency } from 'helpers/generic';
import useCostingCart from '../_hooks/useCostingCart';
import CostingCartDrawingItem from './CostingCartDrawingItem';

const CostingCartPinSummaryItem = ({ building }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { buildingID, cost, floors } = building;
    const { specificBuilding } = useCostingCart(buildingID);
    const drawings = floors.reduce((acc, curr) => {
        acc.push(...curr.drawings);
        return acc;
    }, []);

    return (
        <div className="summary-item">
            <FlexWrapper
                direction="row"
                justify="between"
                align="center"
                extraClasses="summary-row sub-item"
            >
                <h5>{specificBuilding?.name}</h5>
                <div>
                    <AccordionButton
                        active={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </div>
            </FlexWrapper>
            <div className={`expandable ${isExpanded ? 'active' : ''}`}>
                {drawings.map((drawing, i) => (
                    <CostingCartDrawingItem key={i} drawing={drawing} />
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
