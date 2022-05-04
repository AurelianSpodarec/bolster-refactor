import React from 'react';

import useSearch from 'hooks/useSearch';

const useFilterSets = (sets, selectedTypeID) => {
    const { searchTerm, handleUpdateSearch } = useSearch();
    const alphabeticallySortedSets = sets.sort((a, b) => a.name.localeCompare(b.name));
    const sortedSets = alphabeticallySortedSets.sort((a, b) => {
        return a.isDefault === b.isDefault ? 0 : a ? -1 : 1;
    });

    const getFilteredSets = () => {
        return sortedSets.filter(set => {
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
