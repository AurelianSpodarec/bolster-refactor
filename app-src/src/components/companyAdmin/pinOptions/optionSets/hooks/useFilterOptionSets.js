import React from 'react';

const useFilterSets = (sets, searchTerm, selectedTypeID) => {
    const getFilteredSets = () => {
        return sets.filter(set => {
            if (!set.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (set.pinOptionTypeID !== selectedTypeID) return false;
            return true;
        });
    };

    const filteredSets = getFilteredSets();

    return filteredSets;
};

export default useFilterSets;
