import React from 'react';

const useFilterSets = (sets, searchTerm) => {
    const getFilteredSets = () => {
        return sets.filter(set => set.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const filteredSets = getFilteredSets();

    return filteredSets;
};

export default useFilterSets;
