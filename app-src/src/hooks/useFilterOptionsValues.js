import useSearch from './useSearch';

const useFilterOptionValues = (options, isSorting) => {
    const { searchTerm, handleUpdateSearch } = useSearch();

    const getFilteredOptionValues = () => {
        if (isSorting) return options;
        return options.filter(opt => {
            if (!opt.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (opt.isDeleted) return false;
            return true;
        });
    };

    const filteredOptionValues = getFilteredOptionValues();

    return { filteredOptionValues, searchTerm, handleUpdateSearch };
};

export default useFilterOptionValues;
