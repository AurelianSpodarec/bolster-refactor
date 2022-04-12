import React from 'react';

import useSearch from 'hooks/useSearch';

const useFilterOptionValues = (options, isSorting) => {
    const { searchTerm, handleUpdateSearch } = useSearch();

    const getFilteredOptionValues = () => {
        if (isSorting) return options;
        return options.filter(opt => opt.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filteredOptionValues = getFilteredOptionValues();

    return { filteredOptionValues, searchTerm, handleUpdateSearch };
};

export default useFilterOptionValues;
