import React from 'react';
import FlexWrapper from '../../../shared/generic/flexWrapper/FlexWrapper';

const CostingGraphFilterItem = ({ option: { id, name, options }, expandedId, setExpandedId }) => {
    const isOptionExpanded = id === expandedId;
    return (
        <>
            <FlexWrapper align="center" justify="between" extraClasses="filter-item">
                <p>{name}</p>

                <button onClick={() => setExpandedId(isOptionExpanded ? null : id)}>
                    <i className={`far fa-chevron-${isOptionExpanded ? 'up' : 'down'}`} />
                </button>
            </FlexWrapper>

            {isOptionExpanded && (
                <div className="graph-filter-options border">
                    {options?.map(option => (
                        <p>{option.name}</p>
                    ))}
                </div>
            )}
        </>
    );
};

export default CostingGraphFilterItem;
