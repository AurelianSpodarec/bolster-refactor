import React from 'react';

const useFilterOptionValues = (options, searchTerm) => {
    const getFilteredOptionValues = () => {
        return options.filter(opt => opt.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filteredOptionValues = getFilteredOptionValues();

    return filteredOptionValues;
};

export default useFilterOptionValues;
