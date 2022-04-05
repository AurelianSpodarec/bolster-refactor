import React from 'react';

const useFilterOptions = (options, searchTerm) => {
    const getFilteredOptions = () => {
        return options.filter(opt => opt.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filteredOptions = getFilteredOptions();

    return filteredOptions;
};

export default useFilterOptions;
