import React from 'react';

import useSearch from 'hooks/useSearch';

const useFilterOptionValues = options => {
    const { searchTerm, handleUpdateSearch } = useSearch();

    const getFilteredOptionValues = () => {
        return options.filter(opt => opt.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filteredOptionValues = getFilteredOptionValues();

    return { filteredOptionValues, searchTerm, handleUpdateSearch };
};

export default useFilterOptionValues;
