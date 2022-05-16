import React, { useState } from 'react';

import { TOOLTIP_FILTERS_TYPES } from 'constants/companyAdmin/enums';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import FilterInput from '../FilterInput';
import Tickbox from 'components/shared/generic/form/presentational/Tickbox';

const TooltipFiltersItem = ({
    option: { id, name, options, type, allowSearch },
    expandedID,
    setExpandedID,
    onChange,
    selected,
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const isOptionExpanded = id === expandedID;

    const filteredOptions = () => {
        if (searchTerm && allowSearch) {
            return options.filter(option =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        } else {
            return options;
        }
    };

    const handleChange = id => {
        if (type === TOOLTIP_FILTERS_TYPES.SINGLE_SELECTION) {
            onChange(expandedID, id);
        }

        if (type === TOOLTIP_FILTERS_TYPES.MULTI_SELECTION) {
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

            <div className={`tooltip-filter-options border ${isOptionExpanded ? 'active' : ''}`}>
                {allowSearch && (
                    <FilterInput
                        value={searchTerm}
                        handleChange={(_, value) => setSearchTerm(value)}
                        extraContainerClasses="search-container"
                    />
                )}
                <FlexWrapper direction="column" extraClasses="options-wrapper">
                    {filteredOptions()?.map(option => {
                        let isSelected = false;

                        switch (type) {
                            case TOOLTIP_FILTERS_TYPES.SINGLE_SELECTION:
                                isSelected = selected === option.id;
                                break;
                            case TOOLTIP_FILTERS_TYPES.MULTI_SELECTION:
                                isSelected = selected.includes(option.id);
                                break;
                            default:
                                isSelected = false;
                        }

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
