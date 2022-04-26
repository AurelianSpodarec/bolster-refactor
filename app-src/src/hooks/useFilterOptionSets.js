import React from 'react';

import useSearch from 'hooks/useSearch';

const useFilterSets = (sets, selectedTypeID) => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const getFilteredSets = () => {
        return sets.filter(set => {
            if (!set.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (set.pinOptionTypeID !== selectedTypeID) return false;
            if (set.isDeleted) return false;
            return true;
        });
    };

    const filteredSets = getFilteredSets();

    return { filteredSets, searchTerm, handleUpdateSearch };
};

export default useFilterSets;
