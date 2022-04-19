import React from 'react';

const useFilterPrelims = (prelims, searchTerm) => {
    const getFilteredPrelims = () => {
        return prelims.filter(prelim =>
            prelim.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    };

    const filteredPrelims = getFilteredPrelims();

    return filteredPrelims;
};

export default useFilterPrelims;
