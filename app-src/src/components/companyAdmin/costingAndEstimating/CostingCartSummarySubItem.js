import AccordionButton from 'components/shared/generic/button/presentational/AccordionButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import React, { useState } from 'react';

const CostingCartSummarySubItem = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="summary-item">
            <FlexWrapper
                direction="row"
                justify="between"
                align="center"
                extraClasses="summary-row sub-item"
            >
                <h5>Subtitle</h5>
                <div>
                    <AccordionButton
                        active={isExpanded}
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                </div>
            </FlexWrapper>
            <div className={`expandable ${isExpanded ? 'active' : ''}`}>
                <FlexWrapper
                    direction="row"
                    justify="between"
                    align="center"
                    extraClasses="sub-item"
                >
                    <span>Item 1 - 200 pins</span>
                    <span>£5000.27</span>
                </FlexWrapper>
                <FlexWrapper
                    direction="row"
                    justify="between"
                    align="center"
                    extraClasses="sub-item"
                >
                    <span>Item 2 - 100 pins</span>
                    <span>£3000.27</span>
                </FlexWrapper>
                <FlexWrapper
                    direction="row"
                    justify="between"
                    align="center"
                    extraClasses="sub-item"
                >
                    <span>Item 3 - 15 pins</span>
                    <span>£300.27</span>
                </FlexWrapper>
            </div>
            <div className="divider" />
            <div className="total">
                <h5>£18,616.78</h5>
            </div>
        </div>
    );
};

export default CostingCartSummarySubItem;
