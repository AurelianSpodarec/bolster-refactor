import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import React, { useState } from 'react';

const CostingCartSummaryItem = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="summary-item">
            <FlexWrapper direction="row" justify="between" align="center">
                <h4>Title</h4>
                <div>
                    <AccordionButton
                        active={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </div>
            </FlexWrapper>
            <div className={`expandable ${isExpanded ? 'active' : ''}`}>{children}</div>
            <div className="divider" />
            <div className="total">
                <h3>£18,616.78</h3>
            </div>
        </div>
    );
};

export default CostingCartSummaryItem;
