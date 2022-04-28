import React, { useMemo, useState } from 'react';

import FlexWrapper from '../../../shared/generic/flexWrapper/FlexWrapper';
import FilterInput from '../../../shared/filters/FilterInput';

const CostingGraphFilterItem = ({ option: { id, name, options }, expandedId, setExpandedId }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const isOptionExpanded = id === expandedId;

    const filteredOptions = useMemo(() => {
        if (searchTerm) {
            return options.filter(option =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        } else {
            return options;
        }
    }, [searchTerm]);

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
                    <FilterInput
                        value={searchTerm}
                        handleChange={(_, value) => setSearchTerm(value)}
                    />

                    {filteredOptions?.map(option => (
                        <FlexWrapper key={option.id} align="center">
                            <p>{option.name}</p>
                        </FlexWrapper>
                    ))}
                </div>
            )}
        </>
    );
};

export default CostingGraphFilterItem;
