import React, { useState } from 'react';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import FilterInput from '../FilterInput';
import Tickbox from 'components/shared/generic/form/presentational/Tickbox';

const TooltipFiltersItem = ({
    option: { id, name, options, isMultiSelection },
    expandedID,
    setExpandedID,
    onChange,
    selected,
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const isOptionExpanded = id === expandedID;

    const filteredOptions = () => {
        if (searchTerm) {
            return options.filter(option =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        } else {
            return options;
        }
    };

    const handleChange = id => {
        if (isMultiSelection) {
            if (selected.includes(id)) {
                if (id === 0) return;

                let updatedOptions = selected.filter(opt => opt !== id);

                if (!updatedOptions.length) updatedOptions = [0];

                onChange(expandedID, updatedOptions);
            } else {
                const updatedOptions = [...selected, id];
                const filteredOptions = id !== 0 ? updatedOptions.filter(opt => opt !== 0) : [id];

                onChange(expandedID, filteredOptions);
            }
        } else {
            onChange(expandedID, id);
        }
    };

    return (
        <>
            <FlexWrapper>
                <button
                    onClick={() => setExpandedID(isOptionExpanded ? null : id)}
                    className="filter-item flex flex-row align-center justify-between"
                >
                    <p>{name}</p>

                    <i className={`far fa-chevron-down ${isOptionExpanded ? 'active' : ''}`} />
                </button>
            </FlexWrapper>

            <div className={`graph-filter-options border ${isOptionExpanded ? 'active' : ''}`}>
                <FilterInput value={searchTerm} handleChange={(_, value) => setSearchTerm(value)} />
                <FlexWrapper direction="column" extraClasses="options-wrapper">
                    {filteredOptions()?.map(option => {
                        const isSelected = isMultiSelection
                            ? selected.includes(option.id)
                            : selected === option.id;

                        return (
                            <FlexWrapper key={option.id} align="center" extraClasses="option">
                                <Tickbox
                                    label={option.name}
                                    name="tickbox"
                                    checked={isSelected}
                                    handleChange={() => handleChange(option.id)}
                                />
                            </FlexWrapper>
                        );
                    })}
                </FlexWrapper>
            </div>
        </>
    );
};

export default TooltipFiltersItem;
