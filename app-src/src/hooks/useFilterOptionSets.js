import useSearch from 'hooks/useSearch';

const useFilterSets = (sets, selectedTypeID) => {
    const { searchTerm, handleUpdateSearch } = useSearch();

    const getSortedSets = () => {
        return [...sets].sort((a, b) => b.isDefault - a.isDefault || a.name.localeCompare(b.name));
    };

    const getFilteredSets = () => {
        const sortedSets = getSortedSets();

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
