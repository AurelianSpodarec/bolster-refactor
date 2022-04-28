import React, { useMemo, useState } from 'react';

import FlexWrapper from '../../../shared/generic/flexWrapper/FlexWrapper';
import FilterInput from '../../../shared/filters/FilterInput';
import Tickbox from '../../../shared/generic/form/presentational/Tickbox';

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
            <FlexWrapper>
                <button
                    onClick={() => setExpandedId(isOptionExpanded ? null : id)}
                    className="filter-item flex flex-row align-center justify-between"
                >
                    <p>{name}</p>

                    <i className={`far fa-chevron-${isOptionExpanded ? 'up' : 'down'}`} />
                </button>
            </FlexWrapper>

            {isOptionExpanded && (
                <div className="graph-filter-options border">
                    <FilterInput
                        value={searchTerm}
                        handleChange={(_, value) => setSearchTerm(value)}
                    />

                    <FlexWrapper direction="column" extraClasses="options-wrapper">
                        {filteredOptions?.map(option => (
                            <FlexWrapper key={option.id} align="center" extraClasses="option">
                                <Tickbox label={option.name} name="tickbox" />
                            </FlexWrapper>
                        ))}
                    </FlexWrapper>
                </div>
            )}
        </>
    );
};

export default CostingGraphFilterItem;
