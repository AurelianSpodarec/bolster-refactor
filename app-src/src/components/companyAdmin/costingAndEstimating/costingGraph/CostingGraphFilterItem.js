import React, { useState } from 'react';

import FlexWrapper from '../../../shared/generic/flexWrapper/FlexWrapper';
import FilterInput from '../../../shared/filters/FilterInput';
import Tickbox from '../../../shared/generic/form/presentational/Tickbox';
import RangeSlider from '../../../shared/generic/form/presentational/RangeSlider';
import { COSTING_GRAPH_FILTER_VALUES } from '../../../../constants/companyAdmin/enums';

const CostingGraphFilterItem = ({
    option: { id, name, options, type },
    expandedId,
    setExpandedId,
    filterFormData,
    onChange,
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const isOptionExpanded = id === expandedId;

    const filteredOptions = () => {
        if (searchTerm) {
            return options.filter(option =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        } else {
            return options;
        }
    };
    const selectedOptions = filterFormData.selectedItems[COSTING_GRAPH_FILTER_VALUES[type]];

    const handleChange = value => {
        if (selectedOptions.includes(value)) {
            const newSelectedOptions = selectedOptions.filter(option => option !== value);
            onChange('selectedItems', {
                ...filterFormData.selectedItems,
                [COSTING_GRAPH_FILTER_VALUES[type]]: [...newSelectedOptions],
            });
        } else {
            onChange('selectedItems', {
                ...filterFormData.selectedItems,
                [COSTING_GRAPH_FILTER_VALUES[type]]: [...selectedOptions, value],
            });
        }
    };

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

            {isOptionExpanded &&
                (type !== 4 ? (
                    <div className="graph-filter-options border">
                        <FilterInput
                            value={searchTerm}
                            handleChange={(_, value) => setSearchTerm(value)}
                        />

                        <FlexWrapper direction="column" extraClasses="options-wrapper">
                            {filteredOptions()?.map(option => {
                                const isSelected = selectedOptions?.length
                                    ? selectedOptions?.includes(option.id)
                                    : true;
                                return (
                                    <FlexWrapper
                                        key={option.id}
                                        align="center"
                                        extraClasses="option"
                                    >
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
                ) : (
                    <div className="slider-container">
                        <RangeSlider
                            min={0}
                            max={1000}
                            name="maxPrice"
                            handleChange={onChange}
                            value={filterFormData.maxPrice}
                        />
                    </div>
                ))}
        </>
    );
};

export default CostingGraphFilterItem;
